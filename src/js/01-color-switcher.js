function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let colorChangeInterval;

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function onStartButtonClick() {
    startButton.disabled = true;
    stopButton.disabled = false;

    colorChangeInterval = setInterval(changeBackgroundColor, 1000);
}

function onStopButtonClick() {
    stopButton.disabled = true;
    startButton.disabled = false;

    clearInterval(colorChangeInterval);
}

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);
