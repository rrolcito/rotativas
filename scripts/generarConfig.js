const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");

const personajes = {};

const formatos = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp"
];

for (const personaje of fs.readdirSync(PUBLIC)) {

    const personajePath = path.join(PUBLIC, personaje);

    if (!fs.statSync(personajePath).isDirectory())
        continue;

    personajes[personaje] = {
        avatar: [],
        firma: []
    };

    for (const tipo of ["avatar", "firma"]) {

        const carpeta = path.join(personajePath, tipo);

        if (!fs.existsSync(carpeta))
            continue;

        personajes[personaje][tipo] =
            fs.readdirSync(carpeta)
            .filter(file =>
                formatos.includes(path.extname(file).toLowerCase())
            );

    }

}

const contenido =
`export const imagenes = ${JSON.stringify(personajes,null,4)};`;

fs.writeFileSync(
    path.join(__dirname,"..","config","imagenes.js"),
    contenido
);

console.log("config generada");
