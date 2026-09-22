const { Client } = require('ssh2');

const SSH_CONFIG = {
    host: '88.223.85.80',
    port: 65002,
    username: 'u224233723',
    password: process.env.SFTP_PASSWORD || 'Redgstone.455'
};

const WP_PATH = '/home/u224233723/domains/nuevasestrellas.com/public_html/cms';

async function main() {
    const conn = new Client();
    console.log('Actualizando configuracion REST y ACF en WordPress...');

    conn.on('ready', () => {
        conn.sftp((err, sftp) => {
            if (err) throw err;

            const muPluginFile = `${WP_PATH}/wp-content/mu-plugins/cpt-rest-acf.php`;

            const phpCode = `<?php
/**
 * Plugin Name: CPT REST API ACF Exposer
 */

// 1. Forzar que todos los grupos de campos ACF tengan show_in_rest = true
add_filter('acf/rest_api/field_group/show_in_rest', '__return_true');
add_filter('acf/settings/rest_api_enabled', '__return_true');

// 2. Inyectar campos ACF directamente en la respuesta REST para cualquier post_type
add_filter('rest_prepare_torneo', 'inject_acf_to_rest', 10, 3);
add_filter('rest_prepare_documento', 'inject_acf_to_rest', 10, 3);
add_filter('rest_prepare_sede', 'inject_acf_to_rest', 10, 3);
add_filter('rest_prepare_scout', 'inject_acf_to_rest', 10, 3);
add_filter('rest_prepare_page', 'inject_acf_to_rest', 10, 3);
add_filter('rest_prepare_post', 'inject_acf_to_rest', 10, 3);

function inject_acf_to_rest($response, $post, $request) {
    $fields = [];
    if (function_exists('get_fields')) {
        $fields = get_fields($post->ID);
    }
    if (empty($fields)) {
        $meta = get_post_meta($post->ID);
        foreach ($meta as $k => $v) {
            if (strpos($k, '_') !== 0) {
                $fields[$k] = maybe_unserialize($v[0]);
            }
        }
    }
    $response->data['acf'] = $fields ? $fields : new stdClass();
    $response->data['acf_fields'] = $fields ? $fields : new stdClass();
    return $response;
}
`;

            const setupScript = `${WP_PATH}/setup_rest_filter.php`;
            const runPhp = `<?php
require_once __DIR__ . '/wp-load.php';
file_put_contents('${muPluginFile}', base64_decode('${Buffer.from(phpCode).toString('base64')}'));
echo "✅ MU Plugin actualizado con rest_prepare filters\\n";
`;

            const writeStream = sftp.createWriteStream(setupScript);
            writeStream.write(runPhp);
            writeStream.end();

            writeStream.on('close', () => {
                conn.exec(`php ${setupScript} && rm -f ${setupScript}`, (execErr, stream) => {
                    if (execErr) throw execErr;

                    let stdout = '';
                    stream.on('data', (d) => stdout += d.toString());
                    stream.on('close', () => {
                        console.log(stdout.trim());
                        conn.end();
                    });
                });
            });
        });
    }).connect(SSH_CONFIG);
}

main().catch(console.error);
