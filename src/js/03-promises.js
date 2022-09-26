import {Notify} from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.forms[0],
  delay: document.forms[0].delay,
  step: document.forms[0].step,
  amount: document.forms[0].amount,
  submit: document.querySelector('[type="submit"]'),
};

refs.submit.addEventListener('click', (e) => {
  e.preventDefault()
  let valueDelay = Number(refs.delay.value)

  for (let i = 1; i <= refs.amount.value; i++) {

    createPromise([i], valueDelay)

      .then((resolve) => Notify.success(resolve))
      .catch((reject) => Notify.failure(reject))

    valueDelay += Number(refs.step.value)
  }

});

function createPromise(position, delay) {
  return new Promise(function (resolve, reject) {

    setTimeout(function () {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay} ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay} ms`);
      }
    }, delay)
  })
}



