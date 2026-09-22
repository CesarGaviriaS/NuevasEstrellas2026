const { Client } = require('ssh2');

const SSH_CONFIG = {
    host: '88.223.85.80',
    port: 65002,
    username: 'u224233723',
    password: process.env.SFTP_PASSWORD || 'Redgstone.455'
};

const WP_PATH = '/home/u224233723/domains/nuevasestrellas.com/public_html/cms';

async function checkAndCleanThumbnails() {
    const conn = new Client();
    conn.on('ready', () => {
        conn.exec(`wp --path=${WP_PATH} post list --post_type=attachment --fields=ID,post_title,guid --format=json`, (err, stream) => {
            let out = '';
            stream.on('data', d => out += d);
            stream.on('close', () => {
                const list = JSON.parse(out);
                const thumbRegex = /-\d+x\d+\.(jpg|jpeg|png|webp|gif)$/i;
                const thumbs = list.filter(i => thumbRegex.test(i.guid));
                const originals = list.filter(i => !thumbRegex.test(i.guid));

                console.log(`📊 Total en DB: ${list.length}`);
                console.log(`✅ Archivos originales principales: ${originals.length}`);
                console.log(`✂️ Miniaturas de resoluciones repetidas a limpiar: ${thumbs.length}`);

                if (thumbs.length > 0) {
                    console.log('\nEjemplos de repetidos detectados:');
                    thumbs.slice(0, 10).forEach(t => console.log(`  [ID ${t.ID}] ${t.post_title} -> ${t.guid}`));

                    const idsToDelete = thumbs.map(t => t.ID).join(' ');
                    console.log(`\n🗑️ Eliminando ${thumbs.length} registros de miniaturas de la Biblioteca de Medios (sin borrar archivos físicos)...`);
                    
                    conn.exec(`wp --path=${WP_PATH} post delete ${idsToDelete} --force`, (delErr, delStream) => {
                        let delOut = '';
                        delStream.on('data', d => delOut += d);
                        delStream.on('close', () => {
                            console.log('✅ Miniaturas eliminadas de la base de datos.');
                            conn.end();
                        });
                    });
                } else {
                    conn.end();
                }
            });
        });
    }).connect(SSH_CONFIG);
}

checkAndCleanThumbnails().catch(console.error);
