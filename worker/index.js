export default {
  async fetch() {

    const respuesta = await fetch(
      "https://rotativas.vercel.app/Deja/avatar/AvatarDeja.png"
    );

    return new Response(respuesta.body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache"
      }
    });

  }
}
