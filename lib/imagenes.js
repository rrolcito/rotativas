import fs from "fs";
import path from "path";

const EXTENSIONES = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg"
];

export function obtenerImagenes(personaje, tipo) {

  const carpeta = path.join(
    process.cwd(),
    "public",
    personaje,
    tipo
  );

  if (!fs.existsSync(carpeta)) {
    return [];
  }

  return fs.readdirSync(carpeta)
    .filter((archivo) => {

      return EXTENSIONES.some((ext) =>
        archivo.toLowerCase().endsWith(ext)
      );

    });

}
