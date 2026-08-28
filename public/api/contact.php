<?php
/**
 * Contact form handler for the static site.
 *
 * The site itself is plain files, so this is the one piece of server code:
 * the form posts JSON here and this passes it on by mail. It lives in public/
 * so the export copies it to out/api/contact.php with everything else.
 *
 * The envelope sender has to be an address on this domain or the host's mail
 * server refuses it and the message is dropped without a bounce. Whoever
 * wrote in goes in Reply-To instead, so hitting reply answers them.
 */

declare(strict_types=1);

const MAIL_TO       = 'kaszubakrzysiek@gmail.com';
const MAIL_FROM     = 'no-reply@kkaszuba.eu';
const MAIL_FROM_NAME = 'kkaszuba.eu';
/** Messages accepted from one address per hour, before it looks like a bot. */
const RATE_LIMIT    = 8;
const RATE_WINDOW   = 3600;
const MAX_BYTES     = 25000;

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

/** Non-ASCII subjects have to be encoded or they arrive as mojibake. */
function encodeHeader(string $value): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $value)) {
        return $value;
    }

    return '=?UTF-8?B?' . base64_encode($value) . '?=';
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

$lines = [
    'From: ' . $name . ' <' . $email . '>',
    'Subject: ' . ($subject !== '' ? $subject : '(none)'),
    'IP: ' . $ip,
    'Sent: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    '',
    $message,
];

$headers = implode("\r\n", [
    'From: ' . encodeHeader(MAIL_FROM_NAME) . ' <' . MAIL_FROM . '>',
    'Reply-To: ' . encodeHeader($name) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(
    MAIL_TO,
    encodeHeader('kkaszuba.eu: ' . ($subject !== '' ? $subject : 'new message')),
    implode("\n", $lines),
    $headers,
    '-f' . MAIL_FROM,
);

if (!$sent) {
    fail(502, 'mail');
}

done();
