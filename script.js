function startTimer(seconds, elementId) {
    let timerElement = document.getElementById(elementId);
    let timeLeft = seconds;

    let countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('alarm').play();
            timerElement.textContent = seconds + "s";
        }
    }, 1000);
}

function openInstructions() {
    const lastImage = localStorage.getItem("lastImage") || 1;
    const win = window.open("", "_blank", "fullscreen=yes");

    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Instruções</title>
            <link rel="stylesheet" href="styles.css">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body class="instructions-body">
            <div class="carousel" id="carousel"></div>
            <button class="instructions-button" onclick="window.close()">FECHAR</button>

            <script>
                const carousel = document.getElementById("carousel");

                // Carrega 20 imagens
                for (let i = 1; i <= 20; i++) {
                    const img = document.createElement("img");
                    img.src = "instrucao" + i + ".png";
                    img.setAttribute("data-index", i);
                    carousel.appendChild(img);
                }

                // Aguarda DOM atualizar para rolar até a última imagem
                setTimeout(() => {
                    const lastImageIndex = parseInt(localStorage.getItem("lastImage") || 1);
                    carousel.scrollTop = (lastImageIndex - 1) * window.innerHeight;
                }, 100);

                // Salva a imagem atual ao rolar
                carousel.addEventListener("scroll", () => {
                    const currentImage = Math.round(carousel.scrollTop / window.innerHeight) + 1;
                    localStorage.setItem("lastImage", currentImage);
                });
            <\/script>
        </body>
        </html>
    `);
}