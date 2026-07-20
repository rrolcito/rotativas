const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const PUBLIC = path.join(ROOT, "public");
const CONFIG = path.join(ROOT, "config");
const GENERATED = path.join(ROOT, "generated");

// Crear carpetas si no existen
if (!fs.existsSync(CONFIG))
    fs.mkdirSync(CONFIG);

if (!fs.existsSync(GENERATED))
    fs.mkdirSync(GENERATED);

const EXTENSIONES = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp"
];

const datos = {};

const personajes = fs.readdirSync(PUBLIC);

for (const personaje of personajes) {

    const personajePath = path.join(PUBLIC, personaje);

    if (!fs.statSync(personajePath).isDirectory())
        continue;

    datos[personaje] = {};

    for (const tipo of ["avatar","firma"]) {

        const carpeta = path.join(personajePath,tipo);

        if (!fs.existsSync(carpeta)) {

            datos[personaje][tipo] = [];
            continue;

        }

        datos[personaje][tipo] = fs.readdirSync(carpeta)

            .filter(file =>
                EXTENSIONES.includes(
                    path.extname(file).toLowerCase()
                )
            )

            .sort((a,b)=>a.localeCompare(b));

    }

}

// JSON para Cloudflare
fs.writeFileSync(

    path.join(GENERATED,"imagenes.json"),

    JSON.stringify(datos,null,2)

);

// JS para Vercel

const js =
`export const imagenes = ${JSON.stringify(datos,null,4)};`;

fs.writeFileSync(

    path.join(CONFIG,"imagenes.js"),

    js

);

console.log("✔ Configuración generada correctamente");
