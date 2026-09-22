/**
 * Script para subir imágenes y PDFs estáticos de public/ a WordPress
 * y registrarlos en la Biblioteca de Medios de WordPress (wp_posts post_type = attachment).
 */

const SftpClient = require('ssh2-sftp-client');
const { Client: SshClient } = require('ssh2');
const fs = require('fs');
const path = require('path');

const SSH_CONFIG = {
    host: '88.223.85.80',
    port: 65002,
    username: 'u224233723',
    password: process.env.SFTP_PASSWORD || 'Redgstone.455'
};

const WP_PATH = '/home/u224233723/domains/nuevasestrellas.com/public_html/cms';
const LOCAL_PUBLIC_DIR = path.join(__dirname, '../public');
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf'];

function getAllMediaFiles(dir, baseDir = dir, list = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        if (item.startsWith('.')) continue;
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getAllMediaFiles(fullPath, baseDir, list);
        } else {
            const ext = path.extname(item).toLowerCase();
            if (ALLOWED_EXTS.includes(ext)) {
                const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
                list.push({
                    fullPath,
                    relPath,
                    fileName: item,
                    ext
                });
            }
        }
    }
    return list;
}

async function main() {
    const sftp = new SftpClient();
    const mediaFiles = getAllMediaFiles(LOCAL_PUBLIC_DIR);
    console.log(`📁 Encontrados ${mediaFiles.length} archivos para registrar en WordPress Media Library...`);

    const uploadYear = '2026';
    const uploadMonth = '09';
    const remoteUploadDir = `${WP_PATH}/wp-content/uploads/${uploadYear}/${uploadMonth}`;

    console.log('🌐 Conectando por SFTP...');
    await sftp.connect(SSH_CONFIG);
    console.log('✅ Conectado a SFTP.');

    // Asegurar directorio remoto
    const dirExists = await sftp.exists(remoteUploadDir);
    if (!dirExists) {
        await sftp.mkdir(remoteUploadDir, true);
        console.log(`📁 Directorio creado: ${remoteUploadDir}`);
    }

    const uploadedItems = [];
    console.log(`🚀 Subiendo ${mediaFiles.length} archivos a WordPress...`);

    for (let i = 0; i < mediaFiles.length; i++) {
        const file = mediaFiles[i];
        const cleanName = file.fileName.replace(/[^\w\s.-]/g, '').trim().replace(/\s+/g, '-');
        const remoteFilePath = `${remoteUploadDir}/${cleanName}`;

        try {
            await sftp.put(file.fullPath, remoteFilePath);
            uploadedItems.push({
                remotePath: remoteFilePath,
                fileName: cleanName,
                title: path.basename(file.fileName, file.ext).replace(/[-_]/g, ' '),
                relPath: file.relPath,
                ext: file.ext
            });
            console.log(`  [${i + 1}/${mediaFiles.length}] Subido: ${cleanName}`);
        } catch (err) {
            console.error(`  ❌ Error en ${file.relPath}:`, err.message);
        }
    }

    await sftp.end();
    console.log(`\n✅ Subida de archivos finalizada (${uploadedItems.length} archivos).`);

    // Ahora registrar en la base de datos de WordPress vía SSH / PHP
    console.log('\n📝 Registrando archivos en la base de datos de WordPress (Biblioteca de Medios)...');

    const ssh = new SshClient();
    await new Promise((resolve, reject) => {
        ssh.on('ready', () => {
            const phpCode = `<?php
require_once '${WP_PATH}/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$items = json_decode(base64_decode('${Buffer.from(JSON.stringify(uploadedItems)).toString('base64')}'), true);
$inserted = 0;
$skipped = 0;

$upload_dir = wp_upload_dir();

foreach ($items as $item) {
    $file_path = $item['remotePath'];
    $filename = basename($file_path);
    $title = sanitize_text_field($item['title']);

    // Verificar si ya existe un attachment con este archivo
    $existing = get_posts([
        'post_type' => 'attachment',
        'meta_key' => '_wp_attached_file',
        'meta_value' => '${uploadYear}/${uploadMonth}/' . $filename,
        'posts_per_page' => 1
    ]);

    if (!empty($existing)) {
        $skipped++;
        continue;
    }

    $filetype = wp_check_filetype($filename, null);
    $attachment = [
        'guid' => $upload_dir['baseurl'] . '/${uploadYear}/${uploadMonth}/' . $filename,
        'post_mime_type' => $filetype['type'] ? $filetype['type'] : 'application/octet-stream',
        'post_title' => $title,
        'post_content' => '',
        'post_status' => 'inherit'
    ];

    $attach_id = wp_insert_attachment($attachment, $file_path);

    if (!is_wp_error($attach_id) && $attach_id) {
        $attach_data = wp_generate_attachment_metadata($attach_id, $file_path);
        wp_update_attachment_metadata($attach_id, $attach_data);
        $inserted++;
    }
}

echo "RESULT: Insertados: $inserted | Ya existian: $skipped\\n";
`;
            const tmpFile = `${WP_PATH}/register_media_db.php`;
            ssh.exec(`cat << 'EOF' > ${tmpFile}\n${phpCode}\nEOF\nphp ${tmpFile} && rm -f ${tmpFile}`, (err, stream) => {
                if (err) return reject(err);
                let stdout = '';
                stream.on('data', d => stdout += d.toString());
                stream.on('close', () => {
                    console.log('--- Salida de WordPress ---');
                    console.log(stdout.trim());
                    ssh.end();
                    resolve();
                });
            });
        }).connect(SSH_CONFIG);
    });

    console.log('\n🎉 ¡Proceso completado! Todas las imágenes y documentos están listados en la Biblioteca de Medios de WordPress.');
}

main().catch(console.error);
