const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    conn.exec("wp --path=/home/u224233723/domains/nuevasestrellas.com/public_html/cms eval 'print_r(array_column(acf_get_field_groups(array(\"post_id\" => 10)), \"title\"));'", (err, stream) => {
        let out = '';
        stream.on('data', d => out += d);
        stream.on('close', () => {
            console.log('Grupos en Post 10 (Inicio):', out);
            conn.end();
        });
    });
}).connect({ host: '88.223.85.80', port: 65002, username: 'u224233723', password: 'Redgstone.455' });
