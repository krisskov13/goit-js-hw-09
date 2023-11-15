import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userDate;
startButton.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    if (userDate > Date.now()) {
      startButton.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timerInterval;

function startTimer() {
  startButton.setAttribute('disabled', true);
  timerInterval = setInterval(() => {
    const currentTime = convertMs(userDate - Date.now());
    const sumDateSeconds = Object.values(currentTime).reduce(
      (a, b) => a + b,
      0
    );
    if (sumDateSeconds < 0) {
      clearInterval(timerInterval);
      return;
    }

    daysValue.textContent = addLeadingZero(currentTime.days);
    hoursValue.textContent = addLeadingZero(currentTime.hours);
    minutesValue.textContent = addLeadingZero(currentTime.minutes);
    secondsValue.textContent = addLeadingZero(currentTime.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', startTimer);
