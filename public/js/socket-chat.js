var socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has("nombre")) {
  window.location = "index.html";
  throw new Error("El nombre es necesario");
}

let usuario = {
  nombre: params.get("nombre"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, (resp) => {
    console.log("Usuarios conectados: ", resp);
  });
});

socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
socket.emit(
  "enviarMensaje",
  {
    usuario: "Facundo",
    mensaje: "Hola",
  },
  function (resp) {
    console.log("respuesta server: ", resp);
  }
);

// Escuchar información
socket.on("crearMensaje", function (mensaje) {
  console.log("Servidor", mensaje);
});

// Escuchar cuando un usuario entra o sale del chat
socket.on("listPersonas", function (personas) {
  console.log(personas);
});
