/**
 * Script de automatización vía SSH y WP-CLI
 * Configura CPT UI e importa los grupos de campos de ACF directamente en WordPress.
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

async function runSetup() {
    const conn = new Client();
    
    console.log('🚀 Conectando por SSH a Hostinger...');
    
    conn.on('ready', () => {
        console.log('✅ Conexión SSH establecida.');
        
        conn.sftp((err, sftp) => {
            if (err) throw err;
            
            const cptuiConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../cptui-config.json'), 'utf8'));
            const acfHome = JSON.parse(fs.readFileSync(path.join(__dirname, '../acf-home-config.json'), 'utf8'));
            const acfTorneos = JSON.parse(fs.readFileSync(path.join(__dirname, '../acf-torneos-config.json'), 'utf8'));
            
            const phpCode = `<?php
require_once __DIR__ . '/wp-load.php';

// 1. Configurar CPT UI
$cptui = json_decode(base64_decode('${Buffer.from(JSON.stringify(cptuiConfig)).toString('base64')}'), true);
update_option('cptui_post_types', $cptui);
echo "✅ CPT UI configurado con tipos: " . implode(', ', array_keys($cptui)) . "\\n";

// 2. Importar Grupos de ACF
if (function_exists('acf_import_field_group')) {
    $homeGroups = json_decode(base64_decode('${Buffer.from(JSON.stringify(acfHome)).toString('base64')}'), true);
    foreach ($homeGroups as $group) {
        $res = acf_import_field_group($group);
        echo "✅ ACF Home importado: " . $group['title'] . "\\n";
    }

    $torneoGroups = json_decode(base64_decode('${Buffer.from(JSON.stringify(acfTorneos)).toString('base64')}'), true);
    foreach ($torneoGroups as $group) {
        $res = acf_import_field_group($group);
        echo "✅ ACF Torneos importado: " . $group['title'] . "\\n";
    }
} else {
    echo "⚠️ ACF no tiene la función acf_import_field_group disponible.\\n";
}
`;
            
            const remotePhpFile = `${WP_PATH}/temp_setup.php`;
            const writeStream = sftp.createWriteStream(remotePhpFile);
            writeStream.write(phpCode);
            writeStream.end();
            
            writeStream.on('close', () => {
                console.log('📄 Archivo PHP de configuración subido.');
                
                conn.exec(`php ${remotePhpFile} && rm -f ${remotePhpFile}`, (execErr, stream) => {
                    if (execErr) throw execErr;
                    
                    let stdout = '';
                    let stderr = '';
                    
                    stream.on('data', (d) => stdout += d.toString());
                    stream.stderr.on('data', (d) => stderr += d.toString());
                    
                    stream.on('close', (code) => {
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

runSetup().catch(console.error);
