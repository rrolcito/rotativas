import { imagenes } from "../../../lib/imagenes";

export default function handler(req, res) {

  const { personaje } = req.query;

  if (!imagenes[personaje]) {
    return res.status(404).send("Personaje no encontrado");
  }

  const lista = imagenes[personaje].avatar;

  if (lista.length === 0) {
    return res.status(404).send("No hay avatares");
  }

  const imagen = lista[Math.floor(Math.random() * lista.length)];

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  res.redirect(307, `/${personaje}/avatar/${imagen}?t=${Date.now()}`);
}
