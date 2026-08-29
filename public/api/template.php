<?php
/**
 * The formatted version of an enquiry, in the site's own colours.
 *
 * Written the way mail has to be written rather than the way a page is: tables
 * for layout, every style inline, no external stylesheet and no web font.
 * Several widely used clients strip <style> blocks entirely and one of them
 * still cannot lay out a floated div, so this looks deliberately like 2004
 * underneath and correct in the inbox, which is the only place it is seen.
 *
 * Every value is escaped on the way in. The message is the one field that keeps
 * its line breaks, and it gets them as <br> after escaping, never before.
 */

declare(strict_types=1);

/**
 * @param array<int, array{name: string, type: string, content: string}> $files
 */
function enquiryHtml(
    string $name,
    string $email,
    string $subject,
    string $message,
    array $files,
    string $siteName,
): string {
    $e = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    $ink = '#16131f';
    $muted = '#5c5670';
    $faint = '#8b849e';
    $line = '#e7e3f0';
    $accent = '#7c3aed';
    $paper = '#f4f2f9';

    $rows = '';
    $field = static function (string $label, string $value) use (&$rows, $faint, $ink, $line): void {
        $rows .= '<tr>'
            . '<td style="padding:14px 0;border-bottom:1px solid ' . $line . ';'
            . 'font:600 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:0.08em;'
            . 'text-transform:uppercase;color:' . $faint . ';width:120px;vertical-align:top">'
            . $label . '</td>'
            . '<td style="padding:14px 0;border-bottom:1px solid ' . $line . ';'
            . 'font:400 15px/1.5 Arial,Helvetica,sans-serif;color:' . $ink . '">'
            . $value . '</td>'
            . '</tr>';
    };

    $field('Od', $e($name));
    $field(
        'E-mail',
        '<a href="mailto:' . $e($email) . '" style="color:' . $accent . ';text-decoration:none">'
            . $e($email) . '</a>',
    );
    if ($subject !== '') {
        $field('Temat', $e($subject));
    }

    if ($files !== []) {
        $names = array_map(static fn (array $file): string => $e($file['name']), $files);
        $field('Załączniki', implode('<br>', $names));
    }

    $body = nl2br($e($message), false);

    return '<!doctype html>'
        . '<html lang="pl"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<title>' . $e($siteName) . '</title></head>'
        . '<body style="margin:0;padding:0;background:' . $paper . '">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" '
        . 'style="background:' . $paper . '"><tr><td align="center" style="padding:28px 12px">'

        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" '
        . 'style="width:100%;max-width:600px;background:#ffffff;border:1px solid ' . $line . ';'
        . 'border-radius:16px;overflow:hidden">'

        // Header: the one band of colour, so it reads as coming from the site.
        . '<tr><td style="background:' . $accent . ';padding:18px 26px;'
        . 'font:600 15px/1.4 Arial,Helvetica,sans-serif;color:#ffffff">'
        . $e($siteName)
        . '<span style="opacity:0.75;font-weight:400"> &middot; nowe zapytanie</span>'
        . '</td></tr>'

        . '<tr><td style="padding:8px 26px 0">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
        . $rows
        . '</table></td></tr>'

        . '<tr><td style="padding:22px 26px 26px">'
        . '<div style="font:600 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:0.08em;'
        . 'text-transform:uppercase;color:' . $faint . ';padding-bottom:10px">Wiadomość</div>'
        . '<div style="background:' . $paper . ';border:1px solid ' . $line . ';border-radius:12px;'
        . 'padding:18px 20px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:' . $ink . '">'
        . $body
        . '</div></td></tr>'

        . '<tr><td style="padding:16px 26px;background:#faf9fc;border-top:1px solid ' . $line . ';'
        . 'font:400 12px/1.6 Arial,Helvetica,sans-serif;color:' . $muted . '">'
        . 'Odpowiedz na tę wiadomość, a odpowiedź trafi prosto do nadawcy.'
        . '</td></tr>'

        . '</table></td></tr></table></body></html>';
}
