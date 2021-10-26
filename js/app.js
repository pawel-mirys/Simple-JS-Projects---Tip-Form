const inputs = document.querySelectorAll('.form-control');
const btn = document.querySelector('.btn');
const result = document.querySelector('.results');
const tipAmount = document.querySelector('#tip-amount');
const totalAmount = document.querySelector('#total-amount');
const personAmount = document.querySelector('#person-amount');
const loader = document.querySelector('.loader');

let billValue;
let peopleValue;
let serviceValue;
let isValid = false;

const services = [
  {
    value: 1,
    title: 'great = 20%',
  },
  {
    value: 2,
    title: 'good = 10%',
  },
  {
    value: 3,
    title: 'bad = 5%',
  },
  {
    value: 4,
    title: `I don't want to give a tip.`,
  },
];

services.forEach((service) => {
  const newOption = document.createElement('option');
  newOption.textContent = service.title;
  newOption.value = service.value;
  inputs[2].appendChild(newOption);
});

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    switch (e.target.id) {
      case 'input-bill':
        billValue = parseInt(e.target.value);
        break;
      case 'input-users':
        peopleValue = parseInt(e.target.value);
        break;
      case 'input-service':
        serviceValue = parseInt(e.target.value);
    }
    console.log(billValue, peopleValue, serviceValue);
  });
});

const formValidation = () => {
  const feedback = document.querySelector('.feedback');
  const errorMessage = (message) => {
    feedback.classList.add('showItem', 'alert-danger');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    feedback.appendChild(newMessage);
    isValid = false;
    btn.disabled = true;
    setTimeout(() => {
      feedback.classList.remove('showItem', 'alert-danger');
      newMessage.remove();
      btn.disabled = false;
    }, 2000);
  };
  if (billValue === undefined || '') {
    errorMessage('Bill Ammount cannot be blank!');
  }
  if (peopleValue === undefined || '') {
    errorMessage('Number of users must be greater than 0!');
  }
  if (serviceValue === undefined || 0) {
    errorMessage('You Need To Select A Option!');
  } else {
    isValid = true;
  }
};

const calc = () => {
  let tip = 0;
  let total = 0;
  let person = 0;
  if (serviceValue === 1) {
    tip = billValue * 0.2;
  } else if (serviceValue === 2) {
    tip = billValue * 0.1;
  } else if (serviceValue === 3) {
    tip = billValue * 0.05;
  } else if (serviceValue === 4) {
    tip = billValue * 1;
  }
  total = billValue + tip;
  person = total / peopleValue;
  console.log(tip, total, person);

  const showResult = () => {
    loader.classList.add('showItem');
    setTimeout(() => {
      loader.classList.remove('showItem');
      result.classList.add('showItem');
      tipAmount.innerText = tip.toFixed(2);
      totalAmount.innerText = total.toFixed(2);
      personAmount.innerText = person.toFixed(2);
    }, 2000);
    setTimeout(() => {
      result.classList.remove('showItem');
    }, 10000);
  };
  if (isValid === true) {
    showResult();
    // Clear inputs
    const clear = (() => {
      billValue = 0;
      peopleValue = 0;
      serviceValue = 0;
      isValid = false;
      inputs.forEach((input) => {
        input.value = '';
        if (input[2]) {
          input.value = 0;
        }
      });
    })();
  }
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  formValidation();
  calc();
});
