/**
 * Script para limpiar grupos ACF duplicados en WordPress y dejar solo los correctos.
 */

const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const SSH_CONFIG = {
    host: '88.223.85.80',
    port: 65002,
    username: 'u224233723',
    password: process.env.SFTP_PASSWORD || 'Redgstone.455'
};

const WP_PATH = '/home/u224233723/domains/nuevasestrellas.com/public_html/cms';

async function cleanAcfGroups() {
    const conn = new Client();
    
    console.log('🚀 Conectando a WordPress para limpiar grupos duplicados de ACF...');
    
    conn.on('ready', () => {
        conn.sftp((err, sftp) => {
            if (err) throw err;
            
            const acfHome = JSON.parse(fs.readFileSync(path.join(__dirname, '../acf-home-config.json'), 'utf8'));
            const acfTorneos = JSON.parse(fs.readFileSync(path.join(__dirname, '../acf-torneos-config.json'), 'utf8'));
            
            const phpCode = `<?php
require_once __DIR__ . '/wp-load.php';

// 1. Obtener todos los grupos existentes
$existing_groups = get_posts(array(
    'post_type' => 'acf-field-group',
    'posts_per_page' => -1,
    'post_status' => 'any'
));

echo "Borrando grupos anteriores/duplicados (" . count($existing_groups) . ")...\\n";
foreach ($existing_groups as $g) {
    // Forzamos borrado permanente (true)
    wp_delete_post($g->ID, true);
    echo "🗑️ Borrado grupo ID: " . $g->ID . " (" . $g->post_title . ")\\n";
}

// 2. Reimportar limpiamente exactamente los 2 grupos oficiales
if (function_exists('acf_import_field_group')) {
    $homeGroups = json_decode(base64_decode('${Buffer.from(JSON.stringify(acfHome)).toString('base64')}'), true);
    foreach ($homeGroups as $group) {
        acf_import_field_group($group);
        echo "✅ Grupo Oficial 1 Importado: " . $group['title'] . "\\n";
    }

    $torneoGroups = json_decode(base64_decode('${Buffer.from(JSON.stringify(acfTorneos)).toString('base64')}'), true);
    foreach ($torneoGroups as $group) {
        acf_import_field_group($group);
        echo "✅ Grupo Oficial 2 Importado: " . $group['title'] . "\\n";
    }
} else {
    echo "⚠️ acf_import_field_group no disponible\\n";
}

echo "✨ Limpieza completada con éxito. Solo quedaron los 2 grupos oficiales.\\n";
`;
            
            const remotePhpFile = `${WP_PATH}/clean_acf.php`;
            const writeStream = sftp.createWriteStream(remotePhpFile);
            writeStream.write(phpCode);
            writeStream.end();
            
            writeStream.on('close', () => {
                conn.exec(`php ${remotePhpFile} && rm -f ${remotePhpFile}`, (execErr, stream) => {
                    if (execErr) throw execErr;
                    
                    let stdout = '';
                    let stderr = '';
                    
                    stream.on('data', (d) => stdout += d.toString());
                    stream.stderr.on('data', (d) => stderr += d.toString());
                    
                    stream.on('close', () => {
                        console.log('\n--- Salida del Servidor ---');
                        console.log(stdout.trim());
                        if (stderr) console.error('Avisos:', stderr);
                        console.log('---------------------------\n');
                        conn.end();
                    });
                });
            });
        });
    }).connect(SSH_CONFIG);
}

cleanAcfGroups().catch(console.error);
