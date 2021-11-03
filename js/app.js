const inputs = document.querySelectorAll('.form-control');
const btn = document.querySelector('.btn');
const result = document.querySelector('.results');
const tipAmount = document.querySelector('#tip-amount');
const totalAmount = document.querySelector('#total-amount');
const personAmount = document.querySelector('#person-amount');
const loader = document.querySelector('.loader');

let formValues = {
  billValue: 0,
  peopleValue: 0,
  serviceValue: 0,
  isValid: false,
};

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
        formValues.billValue = parseInt(e.target.value);
        break;
      case 'input-users':
        formValues.peopleValue = parseInt(e.target.value);
        break;
      case 'input-service':
        formValues.serviceValue = parseInt(e.target.value);
    }
    console.log(Object.values(formValues));
  });
});

const formValidation = () => {
  const feedback = document.querySelector('.feedback');
  const errorMessage = (message) => {
    feedback.classList.add('showItem', 'alert-danger');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    feedback.appendChild(newMessage);
    btn.disabled = true;
    formValues.isValid = false;
    setTimeout(() => {
      feedback.classList.remove('showItem', 'alert-danger');
      newMessage.remove();
      btn.disabled = false;
    }, 5000);
  };
  if (formValues.billValue === 0 || NaN) {
    errorMessage('Bill Ammount cannot be blank!');
  }
  if (formValues.peopleValue === 0 || NaN) {
    errorMessage('Number of users must be greater than 0!');
  }
  if (formValues.serviceValue === 0 || NaN) {
    errorMessage('You Need To Select An Option!');
  }
  if (
    !!formValues.billValue &&
    !!formValues.peopleValue &&
    !!formValues.serviceValue
  ) {
    formValues.isValid = true;
  }
};

const calc = () => {
  if (formValues.isValid === true) {
    let tip = 0;
    let total = 0;
    let person = 0;
    switch (formValues.serviceValue) {
      case 1:
        tip = formValues.billValue * 0.2;
        break;
      case 2:
        tip = formValues.billValue * 0.1;
        break;
      case 3:
        tip = formValues.billValue * 0.05;
        break;
      case 4:
        tip = formValues.billValue * 1;
        break;
    }

    total = formValues.billValue + tip;
    person = total / formValues.peopleValue;
    console.log(tip, total, person);

    const showResult = (() => {
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
    })();
  }
};
const clear = () => {
  formValues.billValue = 0;
  formValues.peopleValue = 0;
  formValues.serviceValue = 0;
  formValues.isValid = false;
  inputs.forEach((input) => {
    input.value = '';
    if (input[2]) {
      input.value = 0;
    }
  });
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  formValidation();
  calc();
  console.log(formValues.isValid);
  clear();
});
