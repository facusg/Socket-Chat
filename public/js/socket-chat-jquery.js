let params = new URLSearchParams(window.location.search);

//Referencias de jQuery

let divUsuarios = $("#divUsuarios");

// Funciones para renderizar usuarios

//Espero un arreglo de las personas del chat
function renderizarUsuarios(personas) {
  let html = "";
  html += `<li>`;
  html += `<a href="javascript:void(0)" class="active">Chat de <span> ${params.get(
    "sala"
  )}</span></a>`;
  html += `</li>`;

  personas.forEach((persona) => {
    html += `<li>
    <a data-id=${persona.id} href="javascript:void(0)"
      ><img
        src="assets/images/users/1.jpg"
        alt="user-img"
        class="img-circle"
      />
      <span
        >${persona.nombre}
        <small class="text-success">online</small></span
      ></a
    >
  </li>`;
  });

  divUsuarios.html(html);
}

//Listeners
divUsuarios.on("click", "a", function () {
  let id = $(this).data("id");

  if (id) {
    console.log(id);
  }
});
