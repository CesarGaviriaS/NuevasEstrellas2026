const { Client } = require('ssh2');

const SSH_CONFIG = {
    host: '88.223.85.80',
    port: 65002,
    username: 'u224233723',
    password: process.env.SFTP_PASSWORD || 'Redgstone.455'
};

const WP_PATH = '/home/u224233723/domains/nuevasestrellas.com/public_html/cms';

async function registerRemaining() {
    const conn = new Client();
    conn.on('ready', () => {
        const php = `<?php
require_once '${WP_PATH}/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$upload_dir = wp_upload_dir();
$dir = '${WP_PATH}/wp-content/uploads/2026/09';
$files = glob($dir . '/*.*');
$inserted = 0;
$skipped = 0;

foreach ($files as $file_path) {
    $filename = basename($file_path);
    $existing = get_posts([
        'post_type' => 'attachment',
        'meta_key' => '_wp_attached_file',
        'meta_value' => '2026/09/' . $filename,
        'posts_per_page' => 1
    ]);

    if (!empty($existing)) {
        $skipped++;
        continue;
    }

    $filetype = wp_check_filetype($filename, null);
    $title = preg_replace('/\\.[^.]+$/', '', str_replace(['-', '_'], ' ', $filename));
    $attachment = [
        'guid' => $upload_dir['baseurl'] . '/2026/09/' . $filename,
        'post_mime_type' => $filetype['type'] ? $filetype['type'] : 'application/octet-stream',
        'post_title' => $title,
        'post_content' => '',
        'post_status' => 'inherit'
    ];

    $attach_id = wp_insert_attachment($attachment, $file_path);
    if (!is_wp_error($attach_id) && $attach_id) {
        $inserted++;
    }
}

echo "TOTAL_INSERTED: $inserted | TOTAL_EXISTING: $skipped\\n";
`;
        const tmp = `${WP_PATH}/finish_media.php`;
        conn.exec(`cat << 'EOF' > ${tmp}\n${php}\nEOF\nphp ${tmp} && rm -f ${tmp}`, (err, stream) => {
            if (err) throw err;
            let out = '';
            stream.on('data', d => out += d);
            stream.on('close', () => {
                console.log(out.trim());
                conn.end();
            });
        });
    }).connect(SSH_CONFIG);
}

registerRemaining().catch(console.error);
