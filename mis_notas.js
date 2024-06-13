document.addEventListener('DOMContentLoaded', function () {
    actualizarPromedios();
});

function actualizarPromedios() {
    const materias = [
        'lenguaje',
        'comprension',
        'ingles',
        'matematicas',
        'taller-matematicas',
        'historia',
        'ciencias',
        'tecnologia',
        'artes',
        'educacion'
    ];

    materias.forEach(materia => {
        const notas = [];
        for (let i = 1; i <= 5; i++) {
            const nota = parseFloat(document.getElementById(`${materia}-1-${i}`).textContent);
            if (!isNaN(nota)) {
                notas.push(nota);
            }
        }
        const promedio = calcularPromedio(notas);
        document.getElementById(`promedio-${materia}`).textContent = promedio;
    });
}

function calcularPromedio(notas) {
    if (notas.length === 0) return '0.00';
    const sum = notas.reduce((acc, nota) => acc + nota, 0);
    return (sum / notas.length).toFixed(2);
}

document.getElementById('notas-body').addEventListener('input', actualizarPromedios);

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

function mostrarMensaje(mensaje, tipo = 'info') {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo;
    mensajeDiv.style.display = 'block';
    setTimeout(() => mensajeDiv.style.display = 'none', 5000);
}
