import imagenes from "../generated/imagenes.json";

export default {

  async fetch(request) {

    const url = new URL(request.url);

    let personaje = url.pathname.slice(1);

    if (!personaje) {
      return new Response("Indica un personaje", {
        status: 400
      });
    }

    personaje = personaje.replace(".png", "");

    if (!imagenes[personaje]) {

      return new Response("Personaje no encontrado", {
        status:404
      });

    }

    const lista = imagenes[personaje].avatar;

    const imagen =
      lista[Math.floor(Math.random() * lista.length)];

    const respuesta = await fetch(
      `https://rotativas.vercel.app/${personaje}/avatar/${imagen}`
    );

    return new Response(respuesta.body, {

      headers: {
        "Content-Type":"image/png",
        "Cache-Control":"no-cache"
      }

    });

  }

}
