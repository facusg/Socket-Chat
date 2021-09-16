const { io } = require("../server");
const { Usuario } = require("../classes/usuarios");
const { crearMensaje } = require("../utils/utils");
const usuarios = new Usuario();

io.on("connection", (client) => {
  client.on("entrarChat", (data, callback) => {
    if (!data.nombre) {
      return callback({ error: true, mensaje: "El nombre es necesario" });
    }

    let personas = usuarios.agregarPersona(client.id, data.nombre);

    client.broadcast.emit("listPersonas", usuarios.obtenerPersonas());
    callback(personas);
  });

  client.on("crearMensaje", (data) => {
    let persona = usuarios.obtenerPersona(client.id);
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.emit("crearMensaje", mensaje);
  });

  client.on("disconnect", () => {
    let personaBorrada = usuarios.eliminarPersona(client.id);

    client.broadcast.emit(
      "crearMensaje",
      crearMensaje("Administrador", `${personaBorrada.nombre} abandono el chat`)
    );
    client.broadcast.emit("listPersonas", usuarios.obtenerPersonas());
  });
});
