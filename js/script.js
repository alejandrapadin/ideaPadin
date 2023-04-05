// Obtener los elementos del DOM
let horaAlarmaInput = document.getElementById('horaAlarma');
let establecerAlarmaBtn = document.getElementById('establecerAlarma');

// Recuperar la hora de la alarma guardada en el almacenamiento local (si existe)
let horaAlarmaGuardada = localStorage.getItem('horaAlarma');
if (horaAlarmaGuardada) {
  horaAlarmaInput.value = horaAlarmaGuardada;
}

// Asignar una función al botón "Establecer Alarma"
establecerAlarmaBtn.addEventListener('click', function () {
  // Obtener la hora actual
  let horaActual = new Date();
  // Obtener la hora establecida para la alarma
  let horaAlarma = horaAlarmaInput.value;
  // Separar la hora y los minutos de la hora establecida
  let hora = horaAlarma.split(':')[0];
  let minutos = horaAlarma.split(':')[1];
  // Crear un nuevo objeto Date con la hora de la alarma
  let alarma = new Date(horaActual.getFullYear(), horaActual.getMonth(), horaActual.getDate(), hora, minutos);
  // Calcular la diferencia entre la hora actual y la hora de la alarma
  let diferencia = alarma.getTime() - horaActual.getTime();
  // Si la hora de la alarma es anterior a la hora actual, sumar 24 horas al objeto Date de la alarma
  if (diferencia < 0) {
    alarma.setDate(alarma.getDate() + 1);
    diferencia = alarma.getTime() - horaActual.getTime();
  }
  // Guardar la hora de la alarma en el almacenamiento local:
  localStorage.setItem('horaAlarma', horaAlarma);
  // Establecer un temporizador para que la alarma suene:
  setTimeout(function () {
    // Crear un elemento de audio para reproducir el sonido de la alarma:
    let audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.play();
    //Elemento HTML para mostrar un mensaje de alarma:
    let mensaje = document.createElement('h2');
    mensaje.innerText = '¡Arriba! ¡Que ser programador no es fácil!';
    document.body.appendChild(mensaje);
    // Eliminar la hora de la alarma guardada del almacenamiento local
    localStorage.removeItem('horaAlarma');
  }, diferencia);
});