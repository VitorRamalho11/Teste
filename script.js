// Variáveis globais
let activeTimers = {};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Elementos da página principal
    const timer30 = document.getElementById('timer30');
    const timer60 = document.getElementById('timer60');
    const instructionsBtn = document.querySelector('.instructions-button');
    const alarm = document.getElementById('alarm');

    // Event listeners
    timer30.addEventListener('click', () => startTimer(30, 'timer30'));
    timer60.addEventListener('click', () => startTimer(60, 'timer60'));
    instructionsBtn.addEventListener('click', openInstructions);
});

// Função do temporizador
function startTimer(seconds, elementId) {
    // Para o temporizador existente se houver
    if (activeTimers[elementId]) {
        clearInterval(activeTimers[elementId]);
    }
    
    let timerElement = document.getElementById(elementId);
    let timeLeft = seconds;
    timerElement.textContent = timeLeft + "s";

    activeTimers[elementId] = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(activeTimers[elementId]);
            document.getElementById('alarm').play();
            timerElement.textContent = seconds + "s";
            delete activeTimers[elementId];
        }
    }, 1000);
}

// Função para abrir instruções
function openInstructions() {
    const win = window.open("", "_blank", "fullscreen=yes");
    
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Instruções</title>
            <link rel="stylesheet" href="styles.css">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body class="instructions-window">
            <div class="carousel" id="carousel"></div>
            <button class="close-button" onclick="window.close()">FECHAR</button>
            <script>
                // Código do carrossel embutido
                document.addEventListener('DOMContentLoaded', () => {
                    const carousel = document.getElementById("carousel");
                    
                    // Carrega 20 imagens
                    for (let i = 1; i <= 20; i++) {
                        const img = document.createElement("img");
                        img.src = "instrucao" + i + ".png";
                        img.setAttribute("data-index", i);
                        carousel.appendChild(img);
                    }

                    // Rola até a última imagem vista
                    setTimeout(() => {
                        const lastImageIndex = parseInt(localStorage.getItem("lastImage") || 1);
                        carousel.scrollTo({
                            top: (lastImageIndex - 1) * window.innerHeight,
                            behavior: 'auto'
                        });
                    }, 100);

                    // Salva a imagem atual ao rolar
                    carousel.addEventListener("scroll", () => {
                        const currentImage = Math.round(carousel.scrollTop / window.innerHeight) + 1;
                        localStorage.setItem("lastImage", currentImage);
                    });
                });
            </script>
        </body>
        </html>
    `);
}