const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body
}


refs.start.addEventListener('click', startGetColors)
refs.stop.addEventListener('click', stopGetColors)

let refreshInterval

function startGetColors() {
  refreshInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor()

  }, 1000)
  refs.start.disabled = true
  refs.stop.disabled = false

}

function stopGetColors() {
  clearInterval(refreshInterval)
  refs.start.disabled = false
  refs.stop.disabled = true

}

console.log(refreshInterval)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

console.log(getRandomHexColor())