//Haz tú validación en javascript acá
import { tiposError, mensajes } from "./customErrors.js";

const camposDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const listaRespuestas = {
    nombre: e.target.elements["nombre"].value,
    email: e.target.elements["email"].value,
    mensaje: e.target.elements["mensaje"].value,
  };
  localStorage.setItem("registro", JSON.stringify(listaRespuestas));

  window.location.href = "./index.html";
});

camposDeFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificarCampo(campo));
  /* caputar evento invalid */
  campo.addEventListener("invalid", evento => evento.preventDefault());
});

function verificarCampo(campo){
  let mensaje=""
  campo.setCustomValidity("")
  tiposError.forEach(error=>{
    if(campo.validity[error]){
      mensaje=mensajes[campo.name][error]
      console.log(mensaje)
    }
  })
  const mensajeError= campo.parentNode.querySelector(".mensaje-error");
  const validarInputCheck= campo.checkValidity()
  if(!validarInputCheck){
    mensajeError.textContent=mensaje
  }else{
    mensajeError.textContent=""
  }
}