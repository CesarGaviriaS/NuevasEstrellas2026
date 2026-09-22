/**
 * Script para registrar grupos de campos ACF específicos para los CPTs:
 * - Documentos Oficiales (subir archivo PDF)
 * - Sedes y Canchas (enlace Google Maps)
 * - Scouts y Veedores (logo/escudo)
 * - Torneos (configuración completa)
 */

const { Client } = require('ssh2');

const SSH_CONFIG = {
    host: '88.223.85.80',
    port: 65002,
    username: 'u224233723',
    password: process.env.SFTP_PASSWORD || 'Redgstone.455'
};

const WP_PATH = '/home/u224233723/domains/nuevasestrellas.com/public_html/cms';

const cptFieldGroups = [
    // 1. Grupo para Documentos Oficiales (CPT: documento)
    {
        key: 'group_cpt_documento',
        title: '📄 Archivo del Documento Oficial',
        fields: [
            {
                key: 'field_cpt_doc_file',
                label: 'Archivo PDF Descargable',
                name: 'documento_pdf',
                type: 'file',
                return_format: 'url',
                instructions: 'Sube o selecciona el archivo PDF de este documento.',
                required: 1
            },
            {
                key: 'field_cpt_doc_sub',
                label: 'Subtítulo / Texto de Acción',
                name: 'documento_subtitulo',
                type: 'text',
                default_value: 'Descargar PDF'
            },
            {
                key: 'field_cpt_doc_year',
                label: 'Edición del Torneo',
                name: 'torneo_edicion',
                type: 'select',
                choices: {
                    '2026': 'Edición 2026',
                    '2025': 'Edición 2025',
                    '2024': 'Edición 2024'
                },
                default_value: '2026'
            }
        ],
        location: [
            [
                {
                    param: 'post_type',
                    operator: '==',
                    value: 'documento'
                }
            ]
        ]
    },

    // 2. Grupo para Sedes y Canchas (CPT: sede)
    {
        key: 'group_cpt_sede',
        title: '📍 Configuración de la Sede',
        fields: [
            {
                key: 'field_cpt_sede_map',
                label: 'Enlace Google Maps Embed (iframe)',
                name: 'mapa_embed_url',
                type: 'text',
                instructions: 'Pega la URL de Google Maps que viene en el botón Compartir -> Incorporar un mapa (src="..." del iframe).'
            },
            {
                key: 'field_cpt_sede_city',
                label: 'Ciudad / Ubicación',
                name: 'sede_ciudad',
                type: 'text',
                default_value: 'Yopal, Casanare'
            },
            {
                key: 'field_cpt_sede_year',
                label: 'Edición del Torneo',
                name: 'torneo_edicion',
                type: 'select',
                choices: {
                    '2026': 'Edición 2026',
                    '2025': 'Edición 2025',
                    '2024': 'Edición 2024'
                },
                default_value: '2026'
            }
        ],
        location: [
            [
                {
                    param: 'post_type',
                    operator: '==',
                    value: 'sede'
                }
            ]
        ]
    },

    // 3. Grupo para Scouts y Veedores (CPT: scout)
    {
        key: 'group_cpt_scout',
        title: '🔍 Logo y Datos del Scout / Club',
        fields: [
            {
                key: 'field_cpt_scout_logo',
                label: 'Escudo / Logo del Club',
                name: 'scout_logo',
                type: 'image',
                return_format: 'url',
                instructions: 'Sube la imagen del escudo del club o veedor.',
                required: 1
            },
            {
                key: 'field_cpt_scout_year',
                label: 'Edición del Torneo',
                name: 'torneo_edicion',
                type: 'select',
                choices: {
                    '2026': 'Edición 2026',
                    '2025': 'Edición 2025',
                    '2024': 'Edición 2024'
                },
                default_value: '2026'
            }
        ],
        location: [
            [
                {
                    param: 'post_type',
                    operator: '==',
                    value: 'scout'
                }
            ]
        ]
    }
];

async function setupCptAcf() {
    const conn = new Client();
    console.log('🚀 Conectando a WordPress para registrar campos de los menús CPT...');

    conn.on('ready', () => {
        conn.sftp((err, sftp) => {
            if (err) throw err;

            const phpCode = `<?php
require_once __DIR__ . '/wp-load.php';

if (function_exists('acf_import_field_group')) {
    $groups = json_decode(base64_decode('${Buffer.from(JSON.stringify(cptFieldGroups)).toString('base64')}'), true);
    foreach ($groups as $group) {
        $res = acf_import_field_group($group);
        echo "✅ Grupo CPT importado: " . $group['title'] . "\\n";
    }
} else {
    echo "⚠️ ACF no tiene la función acf_import_field_group activa.\\n";
}
`;

            const remotePhpFile = `${WP_PATH}/setup_cpt_acf.php`;
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

setupCptAcf().catch(console.error);
