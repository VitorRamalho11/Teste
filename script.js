let timer30 = document.getElementById("timer30");
let timer60 = document.getElementById("timer60");

let interval30 = null;
let interval60 = null;

const alarm = document.getElementById("alarm");

function resetTimer(label, value, intervalVar) {
  clearInterval(intervalVar);
  label.textContent = value + "s";
  return null;
}

timer30.addEventListener("click", () => {
  if (interval30) {
    interval30 = resetTimer(timer30, 30, interval30);
    return;
  }
  let current = 30;
  timer30.textContent = current + "s";
  interval30 = setInterval(() => {
    current--;
    timer30.textContent = current + "s";
    if (current <= 0) {
      clearInterval(interval30);
      interval30 = null;
      alarm.play();
      timer30.textContent = "30s";
    }
  }, 1000);
});

timer60.addEventListener("click", () => {
  if (interval60) {
    interval60 = resetTimer(timer60, 60, interval60);
    return;
  }
  let current = 60;
  timer60.textContent = current + "s";
  interval60 = setInterval(() => {
    current--;
    timer60.textContent = current + "s";
    if (current <= 0) {
      clearInterval(interval60);
      interval60 = null;
      alarm.play();
      timer60.textContent = "60s";
    }
  }, 1000);
});

function showInstructions() {
  document.getElementById("main-screen").classList.add("hidden");
  document.getElementById("instruction-screen").classList.remove("hidden");
}

function showMain() {
  document.getElementById("instruction-screen").classList.add("hidden");
  document.getElementById("main-screen").classList.remove("hidden");
}