<?php
/**
 * Contact form handler for the static site.
 *
 * The site itself is plain files, so this is the one piece of server code: the
 * form posts JSON here and this passes it on over SMTP. It lives in public/ so
 * the export copies it to out/api/contact.php with everything else.
 *
 * The message is sent as the domain's own mailbox and addressed to it as well,
 * which is what lets Gmail answer it from that address rather than from a
 * personal one. The hosting then forwards it on to wherever it gets read.
 *
 * A forwarded message usually fails the sender check, because the forwarding
 * server is not one the sending domain vouches for. Not here: the same host
 * sends it and forwards it, so the domain's own record still covers the
 * address it arrives from, and the signature survives an untouched redirect.
 *
 * Whoever wrote in goes in Reply-To, so hitting reply answers them.
 */

declare(strict_types=1);

require __DIR__ . '/smtp.php';

/** Messages accepted from one address per hour, before it looks like a bot. */
const RATE_LIMIT = 8;
const RATE_WINDOW = 3600;
const MAX_BYTES = 25000;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail(int $status, string $reason): never
{
    http_response_code($status);
    echo json_encode(['error' => $reason], JSON_UNESCAPED_UNICODE);
    exit;
}

function done(): never
{
    echo json_encode(['ok' => true]);
    exit;
}

/** Header injection lives in newlines. Nothing that reaches a header keeps any. */
function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $value) ?? '');
}

/**
 * Credentials live outside the repository, and outside the site root wherever
 * the hosting allows it.
 *
 * @return array<string, mixed>
 */
function config(): array
{
    foreach ([__DIR__ . '/../../mail-config.php', __DIR__ . '/config.php'] as $path) {
        if (is_readable($path)) {
            $config = require $path;
            if (is_array($config) && ($config['password'] ?? '') !== '') {
                return $config;
            }
        }
    }

    // Nothing configured is a deployment mistake, not something the visitor
    // did, so it is worth saying so rather than pretending the mail was sent.
    fail(500, 'config');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'method');
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > MAX_BYTES) {
    fail(413, 'size');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    // A browser without fetch, or a form posted the ordinary way.
    $data = $_POST;
}

$name    = oneLine((string)($data['name'] ?? ''));
$email   = oneLine((string)($data['email'] ?? ''));
$subject = oneLine((string)($data['subject'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$trap    = trim((string)($data['company'] ?? ''));

/*
 * The honeypot is hidden from people and filled in by anything that walks the
 * form fields. Answering with success rather than an error keeps a bot from
 * learning what tripped it.
 */
if ($trap !== '') {
    done();
}

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'invalid');
}

if (mb_strlen($name) > 120 || mb_strlen($subject) > 200 || mb_strlen($message) > 8000) {
    fail(422, 'length');
}

/*
 * Rate limit per address, kept in the system temp directory. Crude on purpose:
 * a shared host gives nothing better, and this only has to stop the obvious.
 */
$ip = (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$bucket = sys_get_temp_dir() . '/kk-contact-' . sha1($ip) . '.txt';
$hits = [];
if (is_readable($bucket)) {
    $stored = json_decode((string)file_get_contents($bucket), true);
    if (is_array($stored)) {
        $hits = array_values(array_filter(
            $stored,
            static fn ($seen): bool => is_int($seen) && $seen > time() - RATE_WINDOW,
        ));
    }
}

if (count($hits) >= RATE_LIMIT) {
    fail(429, 'rate');
}

$hits[] = time();
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

$config = config();

$body = implode("\n", [
    'From: ' . $name . ' <' . $email . '>',
    'Subject: ' . ($subject !== '' ? $subject : '(none)'),
    'Sent: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    '',
    $message,
]);

$smtp = new Smtp(
    (string)$config['host'],
    (int)$config['port'],
    (string)$config['user'],
    (string)$config['password'],
);

try {
    $smtp->send(
        (string)$config['from'],
        (string)($config['from_name'] ?? ''),
        (string)$config['to'],
        ($config['from_name'] ?? 'website') . ': ' . ($subject !== '' ? $subject : 'new message'),
        $body,
        ['Reply-To' => Smtp::encodeHeader($name) . ' <' . $email . '>'],
    );
} catch (Throwable $error) {
    // The message is worth more than the reason it failed, so it goes to the
    // server log where it can be read later, not back to the browser.
    error_log('contact.php: ' . $error->getMessage());
    fail(502, 'mail');
}

done();
