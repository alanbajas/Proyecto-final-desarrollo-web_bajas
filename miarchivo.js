// Function to greet the user and store/update the name in localStorage
function darBienvenida() {
  let nombre = prompt("Por favor, ingresa tu nombre:");
  if (nombre) {
    localStorage.setItem("nombre", nombre);
    alert(`¡Bienvenido a tu página de notas escolares, ${nombre}!`);
  } else {
    alert("Por favor, ingresa un nombre válido.");
    return darBienvenida();
  }
}

window.onload = function () {
  darBienvenida();
  actualizarFormulario();
};



function calcularPromedio(notas) {
  const filteredNotas = notas.filter((nota) => !isNaN(nota));
  const total = filteredNotas.reduce((sum, nota) => sum + nota, 0);
  return filteredNotas.length
    ? (total / filteredNotas.length).toFixed(2)
    : "0.00";
}

function validarNotas(notas) {
  return notas.every((nota) => !isNaN(nota) && nota >= 0 && nota <= 10);
}

function manejarEnvioFormulario(event) {
  event.preventDefault();

  const notas = [
    parseFloat(document.getElementById("lenguaje").value),
    parseFloat(document.getElementById("matematicas").value),
    parseFloat(document.getElementById("fisica").value),
    parseFloat(document.getElementById("quimica").value),
    parseFloat(document.getElementById("biologia").value),
    parseFloat(document.getElementById("ingles").value),
    parseFloat(document.getElementById("historia").value),
  ];

  if (!validarNotas(notas)) {
    mostrarMensaje("Por favor, ingresa valores válidos entre 0 y 10 para todas las notas.", 'error');
    return;
  }

  const promedio = calcularPromedio(notas);

  document.getElementById("promedio").textContent = promedio;
  document.getElementById("resultado").style.display = "block";

  localStorage.setItem("notas", JSON.stringify(notas));
  localStorage.setItem("promedio", promedio);
}

document.getElementById("notas-form").addEventListener("submit", manejarEnvioFormulario);

function actualizarFormulario() {
  const notas = JSON.parse(localStorage.getItem("notas"));
  if (notas) {
    document.getElementById("lenguaje").value = notas[0] || '';
    document.getElementById("matematicas").value = notas[1] || '';
    document.getElementById("fisica").value = notas[2] || '';
    document.getElementById("quimica").value = notas[3] || '';
    document.getElementById("biologia").value = notas[4] || '';
    document.getElementById("ingles").value = notas[5] || '';
    document.getElementById("historia").value = notas[6] || '';

    const promedio = localStorage.getItem("promedio");
    if (promedio) {
      document.getElementById("promedio").textContent = promedio;
      document.getElementById("resultado").style.display = "block";
    }
  }
}

document.getElementById("sendButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const nota = document.getElementById("nota").value;

  if (email && nota) {
    const subject = encodeURIComponent("Nota desde Mis Notas");
    const body = encodeURIComponent(nota);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  } else {
    mostrarMensaje("Por favor, completa ambos campos antes de enviar.", 'error');
  }
});
