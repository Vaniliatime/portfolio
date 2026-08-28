<?php
/**
 * Template for the mail configuration. Copy, fill in, and put the copy
 * somewhere the web server will not serve it.
 *
 * The handler looks in two places, in this order:
 *
 *   1. ../../mail-config.php   one level above the site root, so a mistake in
 *                              the server configuration still cannot expose it.
 *                              This is the one to use.
 *   2. api/config.php          next to the handler. Only if the hosting gives
 *                              no access above the root. Git ignores it.
 *
 * Neither copy belongs in the repository. This file, with no real values in
 * it, is the only one that does.
 */

return [
    // The mailbox the form authenticates as, on the site's own domain.
    'host' => 'h56.seohost.pl',
    'port' => 465,
    'user' => 'contact@example.com',
    'password' => '',

    /*
     * Sent from the domain's mailbox and addressed to it too, rather than
     * straight to a personal inbox: a mail client answering it then replies as
     * this address by itself. Getting it in front of you is the forwarding
     * rule's job, set on the hosting side.
     */
    'from' => 'contact@example.com',
    'from_name' => 'example.com',
    'to' => 'contact@example.com',
];
