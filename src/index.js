import './style.css';

const inputs = [...document.querySelectorAll('input')];

const checkedInputs = inputs.slice(0, -2);

const showError = (input) => {
  const spanTxt = input.nextElementSibling;
  const inputClasslist = input.classList;

  inputClasslist.add('error');

  if (input.validity.valueMissing) {
    spanTxt.innerText = `Please input your ${input.name}`;
  } else if (input.validity.typeMismatch) {
    spanTxt.innerText = `entered value is not ${input.name}`;
  } else if (input.validity.patternMismatch) {
    spanTxt.innerText = `entered value is not ${input.name}`;
  } else if (input.validity.tooShort) {
    spanTxt.innerText = `${input.name} must be at least ${input.minLength} characters`;
  }
};

const checkValidity = (i) => {
  if (i.validity.valid) {
    const spanTxt = i.nextElementSibling;
    const inputClasslist = i.classList;

    inputClasslist.remove('error');

    console.log(spanTxt);
    spanTxt.innerText = '';
  } else {
    showError(i);
  }
};

checkedInputs.forEach((i) => {
  i.addEventListener('input', () => checkValidity(i));
  i.addEventListener('focus', () => checkValidity(i));
});

const allInputs = inputs.slice(0, -1);

allInputs.forEach((i) => {
  i.addEventListener('invalid', (e) => {
    e.preventDefault();
  });
});

const rPass = document.querySelector('#rPassword');
const pass = document.querySelector('#password');

const checkRPass = () => {
  const spanTxt = rPass.nextElementSibling;
  const inputClasslist = rPass.classList;
  if (
    rPass.value === pass.value &&
    !pass.validity.tooShort &&
    !pass.validity.valueMissing
  ) {
    spanTxt.innerText = '';
    inputClasslist.remove('error');
  } else if (pass.validity.valueMissing) {
    spanTxt.innerText = "Password can't be empty";
    inputClasslist.add('error');
  } else if (pass.validity.tooShort || pass.value === '') {
    spanTxt.innerText = `Password must be ${pass.minLength} characters`;
    inputClasslist.add('error');
  } else if (rPass.value !== pass.value) {
    spanTxt.innerText = "Passwords doesn't match";
    inputClasslist.add('error');
  }
};

rPass.addEventListener('input', checkRPass);

const submit = document.querySelector('input[type="submit"]');

const checkForm = () => {
  checkedInputs.forEach((i) => {
    checkValidity(i);
  });
  checkRPass();
};

submit.addEventListener('click', checkForm);
