import { imagenes } from "../../../config/imagenes";
import { elegirImagen } from "../../../lib/randomImage";

export default function handler(req, res) {

  const { personaje } = req.query;

  if (!imagenes[personaje]) {
    return res.status(404).send("Personaje no encontrado");
  }

  const lista = imagenes[personaje].firma;

  if (lista.length === 0) {
    return res.status(404).send("No hay firmas");
  }

  const imagen = elegirImagen(personaje, "firma", lista);

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  res.redirect(307, `/${personaje}/firma/${imagen}?t=${Date.now()}`);
}
