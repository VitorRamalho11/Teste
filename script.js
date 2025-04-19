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
  const defaultTimes = { timer30: 30, timer60: 60 };
  let lastScrollY = 0;

  function startOrResetTimer(seconds, element) {
    const id = element.id;

    if (activeTimers[id]) {
      clearInterval(activeTimers[id]);
      element.textContent = `${seconds}`;
      delete activeTimers[id];
      return;
    }

    let timeLeft = seconds;
    element.textContent = timeLeft;

    activeTimers[id] = setInterval(() => {
      timeLeft--;
      element.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(activeTimers[id]);
        alarm.play();
        element.textContent = seconds;
        delete activeTimers[id];
      }
    }, 1000);
  }

  function loadInstructions() {
    carousel.innerHTML = '';

    for (let i = 1; i <= 20; i++) {
      const slide = document.createElement('div');
      slide.className = 'instruction-slide';

      const img = document.createElement('img');
      img.src = `instrucao${i}.png`;
      img.alt = `Instrução ${i}`;

      slide.appendChild(img);
      carousel.appendChild(slide);
    }

    mainScreen.classList.add('hidden');
    instructionsScreen.classList.remove('hidden');

    // Volta para a última posição visualizada
    setTimeout(() => {
      carousel.scrollTop = lastScrollY;
    }, 50);
  }

  timer30.addEventListener('click', () => startOrResetTimer(defaultTimes.timer30, timer30));
  timer60.addEventListener('click', () => startOrResetTimer(defaultTimes.timer60, timer60));

  btnInstructions.addEventListener('click', loadInstructions);

  btnClose.addEventListener('click', () => {
    // Salva a posição atual
    lastScrollY = carousel.scrollTop;
    instructionsScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
  });
});