import fs from "fs";
import path from "path";

export default function handler(req, res) {

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

    const imagenes = fs.readdirSync(carpeta)
        .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));

    if (imagenes.length === 0) {
        return res.status(404).send("No hay imágenes");
    }

    const imagen =
        imagenes[Math.floor(Math.random() * imagenes.length)];

    res.setHeader("Cache-Control", "no-store");

    res.redirect(
        307,
        `/${personaje}/firma/${imagen}?t=${Date.now()}`
    );

}
