const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    conn.exec('wp --path=/home/u224233723/domains/nuevasestrellas.com/public_html/cms post list --post_type=attachment --fields=ID,post_title,guid --format=json', (err, stream) => {
        let out = '';
        stream.on('data', d => out += d);
        stream.on('close', () => {
            try {
                const list = JSON.parse(out);
                console.log('Total attachments en DB:', list.length);
                const counts = {};
                list.forEach(i => counts[i.post_title] = (counts[i.post_title] || 0) + 1);
                const duplicates = Object.entries(counts).filter(([k, v]) => v > 1);
                console.log('Títulos repetidos (' + duplicates.length + '):', duplicates.slice(0, 15));
                console.log('\nPrimeros 10 items:');
                list.slice(0, 10).forEach(i => console.log(`[${i.ID}] ${i.post_title} -> ${i.guid}`));
            } catch (e) {
                console.error('Error parseando:', e.message, out);
            }
            conn.end();
        });
    });
}).connect({ host: '88.223.85.80', port: 65002, username: 'u224233723', password: 'Redgstone.455' });
