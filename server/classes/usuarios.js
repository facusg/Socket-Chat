class Usuario {
  constructor() {
    this.personas = [];
  }

  agregarPersona(id, nombre, sala) {
    let persona = { id, nombre, sala };
    this.personas.push(persona);

    return this.personas;
  }

  obtenerPersona(id) {
    let persona = this.personas.filter((persona) => persona.id === id)[0];

    return persona;
  }

  obtenerPersonas() {
    return this.personas;
  }

  obtenerPersonasPorSala(sala) {
    let personasSala = this.personas.filter((persona) => persona.sala === sala);
    return personasSala;
  }

  eliminarPersona(id) {
    let personaBorrada = this.obtenerPersona(id);

    this.personas = this.personas.filter((persona) => persona.id !== id);

    return personaBorrada;
  }
}

module.exports = { Usuario };
