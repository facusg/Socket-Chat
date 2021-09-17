const { io } = require("../server");
const { Usuario } = require("../classes/usuarios");
const { crearMensaje } = require("../utils/utils");
const usuarios = new Usuario();

io.on("connection", (client) => {
  client.on("entrarChat", (data, callback) => {
    if (!data.nombre || !data.sala) {
      return callback({ error: true, mensaje: "El nombre/sala es necesario" });
    }

    client.join(data.sala);

    usuarios.agregarPersona(client.id, data.nombre, data.sala);

    client.broadcast
      .to(data.sala)
      .emit("listaPersona", usuarios.obtenerPersonasPorSala(data.sala));

    callback(usuarios.obtenerPersonasPorSala(data.sala));
  });

  client.on("crearMensaje", (data) => {
    let persona = usuarios.obtenerPersona(client.id);
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit("crearMensaje", mensaje);
  });

  client.on("disconnect", () => {
    let personaBorrada = usuarios.eliminarPersona(client.id);

    client.broadcast
      .to(personaBorrada.sala)
      .emit(
        "crearMensaje",
        crearMensaje(
          "Administrador",
          `${personaBorrada.nombre} abandono el chat`
        )
      );
    client.broadcast
      .to(personaBorrada.sala)
      .emit(
        "listaPersona",
        usuarios.obtenerPersonasPorSala(personaBorrada.sala)
      );
  });

  //Mensajes Privados

  client.on("mensajePrivado", (data) => {
    let persona = usuarios.obtenerPersonas(client.id);

    client.broadcast
      .to(data.para)
      .emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje));
  });
});
