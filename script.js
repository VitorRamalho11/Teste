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
    let lastImage = localStorage.getItem("lastImage") || 1;
    let win = window.open("", "_blank", "fullscreen=yes");

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

                for (let i = 1; i <= 20; i++) {
                    let img = document.createElement("img");
                    img.src = "instrucao" + i + ".png";
                    img.setAttribute("data-index", i);
                    carousel.appendChild(img);
                }

                const lastIndex = parseInt(localStorage.getItem("lastImage")) || 1;
                window.addEventListener("load", () => {
                    carousel.scrollTop = (lastIndex - 1) * window.innerHeight;
                });

                carousel.addEventListener("scroll", () => {
                    const currentImage = Math.round(carousel.scrollTop / window.innerHeight) + 1;
                    localStorage.setItem("lastImage", currentImage);
                });
            <\/script>
        </body>
        </html>
    `);
}