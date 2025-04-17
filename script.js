document.addEventListener('DOMContentLoaded', () => {
    // Elementos da página principal
    const timer30 = document.getElementById('timer30');
    const timer60 = document.getElementById('timer60');
    const instructionsBtn = document.querySelector('.instructions-button');
    const alarm = document.getElementById('alarm');
    let activeTimers = {};

    // Event listeners
    timer30.addEventListener('click', () => startTimer(30, 'timer30'));
    timer60.addEventListener('click', () => startTimer(60, 'timer60'));
    instructionsBtn.addEventListener('click', openInstructions);

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
                alarm.play();
                timerElement.textContent = seconds + "s";
                delete activeTimers[elementId];
            }
        }, 1000);
    }

    function openInstructions() {
        // Cria div para a janela de instruções
        const instructionsDiv = document.createElement('div');
        instructionsDiv.className = 'instructions-window';
        
        // Cria carrossel
        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        
        // Adiciona imagens (20 no total)
        for (let i = 1; i <= 20; i++) {
            const img = document.createElement('img');
            img.src = `instrucao${i}.png`;
            img.alt = `Instrução ${i}`;
            carousel.appendChild(img);
        }
        
        // Cria botão de fechar
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-button';
        closeBtn.textContent = 'FECHAR';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(instructionsDiv);
        });
        
        // Monta a estrutura
        instructionsDiv.appendChild(carousel);
        instructionsDiv.appendChild(closeBtn);
        document.body.appendChild(instructionsDiv);
    }
});