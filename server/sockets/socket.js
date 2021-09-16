const { io } = require("../server");
const { Usuario } = require("../classes/usuarios");

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

  client.on("disconnect", () => {
    let personaBorrada = usuarios.eliminarPersona(client.id);

    client.broadcast.emit("crearMensaje", {
      usuario: "Administrador",
      mensaje: `${personaBorrada.nombre} abandono el chat`,
    });
    client.broadcast.emit("listPersonas", usuarios.obtenerPersonas());
  });
});
