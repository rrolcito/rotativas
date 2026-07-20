const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");
const CONFIG = path.join(__dirname, "..", "config", "imagenes.js");

const EXTENSIONES = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp"
];

const datos = {};

for (const personaje of fs.readdirSync(PUBLIC)) {

    const personajePath = path.join(PUBLIC, personaje);

    if (!fs.statSync(personajePath).isDirectory())
        continue;

    datos[personaje] = {};

    for (const tipo of ["avatar","firma"]) {

        const carpeta = path.join(personajePath, tipo);

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

const salida =
`export const imagenes = ${JSON.stringify(datos,null,4)};`;

fs.writeFileSync(CONFIG,salida);

console.log("✔ config/imagenes.js generada correctamente");
