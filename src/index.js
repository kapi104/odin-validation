import './style.css';

// const email = document.querySelector('#email')
// const country = document.querySelector('#country')
// const zipCode = document.querySelector('#zipCode')
// const pass = document.querySelector('#password')
// const rPass = document.querySelector('#rPassword')

const inputs = [...document.querySelectorAll('input')]

const checkedInputs = inputs.slice(0, -2)

const showError = (input) => {
  const spanTxt = input.nextElementSibling
  const inputClasslist = input.classList

  inputClasslist.add('error')

  if (input.validity.valueMissing) {
    spanTxt.innerText = `Please input your ${input.name}`
  } else if (input.validity.typeMismatch) {
    spanTxt.innerText = `entered value is not ${input.name}`
  } else if (input.validity.patternMismatch) {
    spanTxt.innerText = `entered value is not ${input.name}`
  } else if (input.validity.tooShort) {
    spanTxt.innerText = `${input.name} must be at least ${input.minLength} characters`
  }
}

const checkValidity = (i) => {
  if (i.validity.valid) {
    const spanTxt = i.nextElementSibling
    const inputClasslist = i.classList

    inputClasslist.remove('error')

    console.log(spanTxt);
    spanTxt.innerText = ''
  } else {
    showError(i)
  }
}

checkedInputs.forEach((i) => {
  i.addEventListener('input', () => checkValidity(i))
  i.addEventListener('focus', () => checkValidity(i))
});

const disabledValidationMessage = inputs.slice(0, -1)

disabledValidationMessage.forEach(i => {
  i.addEventListener('invalid', (e) => {
    e.preventDefault()
  })
})