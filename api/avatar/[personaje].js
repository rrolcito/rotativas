const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {

    const { personaje } = req.query;

    const carpeta = path.join(
        process.cwd(),
        "public",
        personaje,
        "avatar"
    );

    if (!fs.existsSync(carpeta)) {
        return res.status(404).send("Personaje no encontrado");
    }

    const imagenes = fs.readdirSync(carpeta)
        .filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f));

    if (!imagenes.length) {
        return res.status(404).send("No hay imágenes");
    }

    const imagen = imagenes[
        Math.floor(Math.random() * imagenes.length)
    ];

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    res.redirect(307, `/${personaje}/avatar/${imagen}?t=${Date.now()}`);

};
