let audio = new Audio("alarme.wav"); // Caminho para o arquivo de áudio
let currentImageIndex = 0; // Índice da última imagem visualizada

// Função para iniciar o temporizador
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
            timerElement.textContent = seconds + "s"; // Reinicia o tempo
        }
    }, 1000);
}

// Função para tocar o alarme
function playAlarm() {
    audio.currentTime = 0;
    audio.play().catch(error => console.error("Erro ao tocar som:", error));
}

// Função para carregar as imagens
function loadImages() {
    let container = document.getElementById("image-container");

    for (let i = 1; i <= 20; i++) {
        let img = document.createElement("img");
        img.src = `imagens/instrucao${i}.png`; // Caminho para as imagens
        img.alt = `Instrução ${i}`;
        container.appendChild(img);
    }
}

// Função para mostrar/ocultar as imagens
function toggleImages() {
    let container = document.getElementById("image-container");
    container.classList.toggle("hidden");

    if (!container.classList.contains("hidden")) {
        // Rola até a última imagem visualizada
        let images = container.getElementsByTagName("img");
        if (images.length > 0 && currentImageIndex < images.length) {
            images[currentImageIndex].scrollIntoView({ behavior: "smooth" });
        }
    }
}

// Função para atualizar o índice da última imagem visualizada
function updateCurrentImageIndex() {
    let container = document.getElementById("image-container");
    let images = container.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
        let rect = images[i].getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            currentImageIndex = i;
            break;
        }
    }
}

// Carregar imagens automaticamente ao carregar a página
window.onload = function() {
    loadImages();

    // Atualiza o índice da última imagem visualizada ao rolar
    document.getElementById("image-container").addEventListener("scroll", updateCurrentImageIndex);
};