const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");
const OUTPUT = path.join(__dirname, "..", "generated", "imagenes.json");

const EXTENSIONES = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp"
];

const resultado = {};

const personajes = fs.readdirSync(PUBLIC);

for (const personaje of personajes) {

  const personajePath = path.join(PUBLIC, personaje);

  if (!fs.statSync(personajePath).isDirectory())
    continue;

  resultado[personaje] = {};

  for (const tipo of ["avatar","firma"]) {

    const carpeta = path.join(personajePath, tipo);

    if (!fs.existsSync(carpeta)) {

      resultado[personaje][tipo]=[];
      continue;

    }

    resultado[personaje][tipo] = fs.readdirSync(carpeta)

      .filter(file =>
        EXTENSIONES.includes(
          path.extname(file).toLowerCase()
        )
      )

      .sort((a,b)=>a.localeCompare(b));

  }

}

fs.writeFileSync(
  OUTPUT,
  JSON.stringify(resultado,null,2)
);

console.log("imagenes.json generado");
