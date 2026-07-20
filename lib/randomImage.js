const ultimaImagen = new Map();

export function elegirImagen(personaje, tipo, lista) {
  if (!lista || lista.length === 0) {
    return null;
  }

  // Si solo hay una imagen, no hay alternativa.
  if (lista.length === 1) {
    return lista[0];
  }

  const clave = `${personaje}:${tipo}`;
  const ultima = ultimaImagen.get(clave);

  // Quitamos la última imagen de las candidatas.
  const disponibles = lista.filter(img => img !== ultima);

  // Elegimos una al azar entre las restantes.
  const elegida =
    disponibles[Math.floor(Math.random() * disponibles.length)];

  // La recordamos para la próxima vez.
  ultimaImagen.set(clave, elegida);

  return elegida;
}
