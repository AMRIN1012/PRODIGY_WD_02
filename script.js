let timer;
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateDisplay() {
  let h = hours.toString().padStart(2, '0');
  let m = minutes.toString().padStart(2, '0');
  let s = seconds.toString().padStart(2, '0');
  let ms = milliseconds.toString().padStart(3, '0');
  display.innerText = `${h}:${m}:${s}.${ms}`;
}

function start() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10);
}

function pause() {
  clearInterval(timer);
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  updateDisplay();
  isRunning = false;
  laps.innerHTML = "";
}

function lap() {
  if (!isRunning) return;
  const lapTime = display.innerText;

  const li = document.createElement("li");
  li.innerText = `Lap - ${lapTime}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => laps.removeChild(li);

  li.appendChild(deleteBtn);
  laps.appendChild(li);
}

