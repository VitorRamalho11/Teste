document.addEventListener('DOMContentLoaded', () => {
    const timer30 = document.getElementById('timer30');
    const timer60 = document.getElementById('timer60');
    const btnInstructions = document.querySelector('.btn-instructions');
    const btnClose = document.querySelector('.btn-close');
    const mainScreen = document.querySelector('.main-screen');
    const instructionsScreen = document.querySelector('.instructions-screen');
    const carousel = document.getElementById('carousel');
    const alarm = document.getElementById('alarm');

    let activeTimers = {};
    let lastScrollPosition = 0;

    function startTimer(seconds, element) {
        if (activeTimers[element.id]) clearInterval(activeTimers[element.id]);

        let timeLeft = seconds;
        element.textContent = timeLeft;

        activeTimers[element.id] = setInterval(() => {
            timeLeft--;
            element.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(activeTimers[element.id]);
                alarm.play();
                element.textContent = seconds;
                delete activeTimers[element.id];
            }
        }, 1000);
    }

    function loadInstructions() {
        carousel.scrollTop = lastScrollPosition;
        mainScreen.classList.add('hidden');
        instructionsScreen.classList.remove('hidden');
    }

    for (let i = 1; i <= 20; i++) {
        const slide = document.createElement('div');
        slide.className = 'instruction-slide';

        const img = document.createElement('img');
        img.src = `instrucao${i}.png`;
        img.alt = `Instrução ${i}`;

        slide.appendChild(img);
        carousel.appendChild(slide);
    }

    timer30.addEventListener('click', () => startTimer(30, timer30));
    timer60.addEventListener('click', () => startTimer(60, timer60));
    btnInstructions.addEventListener('click', loadInstructions);
    btnClose.addEventListener('click', () => {
        lastScrollPosition = carousel.scrollTop;
        instructionsScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    });
});