const Client = require('ssh2-sftp-client');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const CONFIG = {
    host: '88.223.85.80',
    port: 65002,
    username: 'u224233723',
    remoteRoot: 'domains/nuevasestrellas.com/public_html',
    localRoot: path.join(__dirname, '../out')
};

function askPassword() {
    return new Promise((resolve) => {
        if (process.env.SFTP_PASSWORD) {
            return resolve(process.env.SFTP_PASSWORD);
        }
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('🔑 Ingresa la contraseña SSH/SFTP de Hostinger: ', (pass) => {
            rl.close();
            resolve(pass.trim());
        });
    });
}

function getAllLocalFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllLocalFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    }
    return arrayOfFiles;
}

async function runDeploy() {
    console.log('🚀 Iniciando proceso de despliegue inteligente...\n');

    // 1. Compilar y preparar out/.htaccess
    console.log('📦 Compilando versión estática (npm run build:prod)...');
    try {
        execSync('npm run build:prod', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    } catch (err) {
        console.error('❌ Error durante la compilación. Despliegue cancelado.');
        process.exit(1);
    }

    if (!fs.existsSync(CONFIG.localRoot)) {
        console.error('❌ La carpeta out/ no existe.');
        process.exit(1);
    }

    const password = await askPassword();
    if (!password) {
        console.error('❌ Contraseña requerida.');
        process.exit(1);
    }

    const sftp = new Client();

    try {
        console.log(`\n🌐 Conectando a ${CONFIG.username}@${CONFIG.host}:${CONFIG.port}...`);
        await sftp.connect({
            host: CONFIG.host,
            port: CONFIG.port,
            username: CONFIG.username,
            password: password,
            readyTimeout: 20000
        });
        console.log('✅ Conexión establecida con éxito.\n');

        const localFiles = getAllLocalFiles(CONFIG.localRoot);
        console.log(`🔍 Analizando ${localFiles.length} archivos locales contra el servidor...`);

        let uploadedCount = 0;
        let skippedCount = 0;
        const startTime = Date.now();

        for (const localFilePath of localFiles) {
            const relativePath = path.relative(CONFIG.localRoot, localFilePath).replace(/\\/g, '/');
            const remoteFilePath = `${CONFIG.remoteRoot}/${relativePath}`;
            const remoteDir = path.dirname(remoteFilePath).replace(/\\/g, '/');

            // REGLA DE SEGURIDAD CRÍTICA: Nunca tocar /cms
            if (relativePath.startsWith('cms/') || relativePath === 'cms') {
                continue;
            }

            const localStats = fs.statSync(localFilePath);
            let shouldUpload = true;

            try {
                const remoteStat = await sftp.stat(remoteFilePath);
                // Si el archivo remoto tiene el mismo tamaño exacto, lo saltamos para ahorrar tiempo
                if (remoteStat.size === localStats.size) {
                    shouldUpload = false;
                }
            } catch {
                // El archivo no existe remotamente, debe subirse
                shouldUpload = true;
            }

            if (shouldUpload) {
                // Asegurar que el directorio remoto exista
                try {
                    await sftp.mkdir(remoteDir, true);
                } catch {}

                await sftp.fastPut(localFilePath, remoteFilePath);
                console.log(`  ⬆️ Subido: ${relativePath} (${(localStats.size / 1024).toFixed(1)} KB)`);
                uploadedCount++;
            } else {
                skippedCount++;
            }
        }

        const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log('\n=============================================');
        console.log(`🎉 ¡Despliegue completado con éxito en ${elapsedSeconds}s!`);
        console.log(`  ⏩ Archivos saltados (sin cambios): ${skippedCount}`);
        console.log(`  ⬆️ Archivos subidos (nuevos/modificados): ${uploadedCount}`);
        console.log('  🛡️ Carpeta /cms protegida e intacta.');
        console.log('=============================================\n');

    } catch (err) {
        console.error('❌ Error durante el despliegue SFTP:', err.message);
    } finally {
        await sftp.end();
    }
}

runDeploy();
