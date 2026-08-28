<?php
/**
 * A small SMTP client, enough to send one message.
 *
 * PHP's own mail() hands the message to the local queue unsigned, and Gmail
 * files that under spam or drops it. Speaking SMTP to the domain's own server
 * instead means the message leaves authenticated, covered by the domain's SPF
 * and DKIM, and arrives like any other mail from that address.
 *
 * PHPMailer would do the same job, but it wants Composer or a vendored copy of
 * a library into a repository that otherwise builds to static files. This is
 * one plain-text message with a subject and a body we control, so the hundred
 * lines below are the whole of what that library would be doing for us.
 */

declare(strict_types=1);

final class SmtpError extends RuntimeException {}

final class Smtp
{
    /** @var resource */
    private $socket;

    public function __construct(
        private string $host,
        private int $port,
        private string $user,
        private string $password,
        private int $timeout = 15,
    ) {
    }

    /**
     * @param array<string, string> $headers
     */
    public function send(
        string $from,
        string $fromName,
        string $to,
        string $subject,
        string $body,
        array $headers = [],
    ): void {
        $this->open();

        try {
            $this->expect(220);
            $this->command('EHLO ' . $this->hostname(), 250);

            // AUTH LOGIN: the server asks for each half in turn, base64 encoded.
            $this->command('AUTH LOGIN', 334);
            $this->command(base64_encode($this->user), 334);
            $this->command(base64_encode($this->password), 235);

            $this->command('MAIL FROM:<' . $from . '>', 250);
            // 251 means the address is not local but will be forwarded on.
            $this->command('RCPT TO:<' . $to . '>', [250, 251]);
            $this->command('DATA', 354);

            $this->write(
                $this->message($from, $fromName, $to, $subject, $body, $headers) . "\r\n.\r\n",
            );
            $this->expect(250);

            $this->command('QUIT', 221);
        } finally {
            $this->close();
        }
    }

    private function open(): void
    {
        $context = stream_context_create([
            'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
        ]);

        // Port 465 is implicit TLS: the socket is encrypted before the greeting.
        $socket = @stream_socket_client(
            'ssl://' . $this->host . ':' . $this->port,
            $code,
            $message,
            $this->timeout,
            STREAM_CLIENT_CONNECT,
            $context,
        );

        if ($socket === false) {
            throw new SmtpError('connect: ' . $message . ' (' . $code . ')');
        }

        stream_set_timeout($socket, $this->timeout);
        $this->socket = $socket;
    }

    private function close(): void
    {
        if (isset($this->socket) && is_resource($this->socket)) {
            @fclose($this->socket);
        }
    }

    /**
     * @param int|int[] $expected
     */
    private function command(string $line, int|array $expected): void
    {
        $this->write($line . "\r\n");
        $this->expect($expected);
    }

    private function write(string $data): void
    {
        if (@fwrite($this->socket, $data) === false) {
            throw new SmtpError('write failed');
        }
    }

    /**
     * Reads one reply, which may run over several lines: every line but the
     * last has a hyphen where the last one has a space.
     *
     * @param int|int[] $expected
     */
    private function expect(int|array $expected): string
    {
        $codes = is_array($expected) ? $expected : [$expected];
        $reply = '';

        while (true) {
            $line = fgets($this->socket, 1024);
            if ($line === false) {
                throw new SmtpError('no reply, expected ' . implode('/', $codes));
            }

            $reply .= $line;
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }

        $code = (int)substr($reply, 0, 3);
        if (!in_array($code, $codes, true)) {
            throw new SmtpError('got ' . $code . ', expected ' . implode('/', $codes));
        }

        return $reply;
    }

    /**
     * @param array<string, string> $headers
     */
    private function message(
        string $from,
        string $fromName,
        string $to,
        string $subject,
        string $body,
        array $headers,
    ): string {
        // One From header, built here. Passing another one in $headers is how
        // a message ends up with two of them and is rejected outright.
        $lines = [
            'Date: ' . date(DATE_RFC2822),
            'From: ' . ($fromName !== ''
                ? self::encodeHeader($fromName) . ' <' . $from . '>'
                : $from),
            'To: ' . $to,
            'Subject: ' . self::encodeHeader($subject),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $this->hostname() . '>',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            // Base64 sidesteps SMTP's line length limit and the leading-dot
            // rule in one go, whatever somebody types into the form.
            'Content-Transfer-Encoding: base64',
        ];

        foreach ($headers as $name => $value) {
            $lines[] = $name . ': ' . $value;
        }

        return implode("\r\n", $lines) . "\r\n\r\n" . chunk_split(base64_encode($body), 76, "\r\n");
    }

    /** Non-ASCII in a header has to be encoded or it arrives as mojibake. */
    public static function encodeHeader(string $value): string
    {
        if (preg_match('/^[\x20-\x7E]*$/', $value)) {
            return $value;
        }

        return '=?UTF-8?B?' . base64_encode($value) . '?=';
    }

    private function hostname(): string
    {
        $host = (string)($_SERVER['SERVER_NAME'] ?? '');

        return $host !== '' ? $host : 'localhost';
    }
}
