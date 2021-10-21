const inputs = document.querySelectorAll('.form-control');
const btn = document.querySelector('.btn');
const feedback = document.querySelector('.feedback');
let billTotal;
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
    value: 3,
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
        billTotal = e.target.value;
        break;
      case 'input-users':
        peopleValue = e.target.value;
        break;
      case 'input-service':
        serviceValue = e.target.value;
    }
    console.log(billTotal, peopleValue, serviceValue);
  });
});

const formValidation = () => {
  const createMessage = (message) => {
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
  if (billTotal === undefined || '') {
    createMessage('Bill Input cannot be blank!');
  }
  if (peopleValue === undefined || '') {
    createMessage('People Input must be greater then 0!');
  }
  if (serviceValue === undefined || 0) {
    createMessage('U need to choose the option!');
  } else {
    isValid = true;
  }
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  formValidation();
});
