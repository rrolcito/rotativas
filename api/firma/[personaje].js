const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { personaje } = req.query;

  const carpeta = path.join(
    process.cwd(),
    "public",
    personaje,
    "firma"
  );

  if (!fs.existsSync(carpeta)) {
    return res.status(404).send("Personaje no encontrado");
  }

  const imagenes = fs.readdirSync(carpeta);

  if (imagenes.length === 0) {
    return res.status(404).send("No hay imágenes");
  }

  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)];

  res.redirect(`/${personaje}/firma/${imagen}`);
};
