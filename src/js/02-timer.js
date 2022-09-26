import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
}
refs.start.addEventListener('click', start)
refs.start.disabled = true;
let isActive = false

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  isActive: false,
  onChange(selectedDates) {
    confirmDate(selectedDates)

  }
}
const selectDate = flatpickr("#datetime-picker", options)


function confirmDate(selectedDates) {
  if (selectedDates[0] <= options.defaultDate) {
    Notify.failure("Please choose a date in the future")
  } else {
    Notify.success("Date selected: " + selectedDates[0])
    refs.start.disabled = false;

  }
}

function start() {
  if (isActive) {
    return
  }

  let timing = setInterval(() => {
    isActive = true;
    const date = selectDate.selectedDates[0].getTime();
    const currentDate = new Date().getTime()
    const distance = date - currentDate
    updateTime(convertMs(distance))
    console.log(distance)
    if (distance < 1000) {
      clearInterval(timing)
      refs.start.disabled = true;
      Notify.warning("Countdown finished")
    }
  }, 1000)

}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return {days, hours, minutes, seconds};
}

function updateTime({days, hours, minutes, seconds}) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}