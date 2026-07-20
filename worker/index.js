import imagenes from "../generated/imagenes.json";

export default {
  async fetch(request) {

    const personaje = "Deja";

    const lista = imagenes[personaje].avatar;

    const imagen =
      lista[Math.floor(Math.random() * lista.length)];

    const respuesta = await fetch(

      `https://rotativas.vercel.app/${personaje}/avatar/${imagen}`

    );

    return new Response(respuesta.body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache"
      }
    });

  }
}
