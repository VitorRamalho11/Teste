function startTimer(seconds, elementId) {
    let timerElement = document.getElementById(elementId);
    let timeLeft = seconds;
    timerElement.textContent = timeLeft + "s";

    let interval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(interval);
            playAlarm();
            timerElement.textContent = seconds + "s"; // Reinicia o texto
        }
    }, 1000);
}

function playAlarm() {
    let audio = new Audio('alarme.wav');  // Som de alarme em WAV
    audio.play();
}

// Adicionar imagens dinamicamente
window.onload = function() {
    let imageContainer = document.getElementById("imageContainer");

    for (let i = 1; i <= 20; i++) {
        let img = document.createElement("img");
        img.src = `imagens/instrucao${i}.png`;
        img.alt = `Instrução ${i}`;
        imageContainer.appendChild(img);
    }
};

