import { LogarithmicScale } from 'chart.js'

function validateFormData(name, email, password, conf_password) {
  let dataIsValid = true
  const validationError = {
    nameInput: [],
    emailInput: [],
    passwordInput: [],
    passwordConfInput: [],
  }

  let minLenName = 3
  let maxLenName = 16
  let minPasswordLen = 8
  let maxPasswordLen = 16
  let regexName = /[^\w]/
  let regexEmail = /[-.\w]{3,}@([-\w]{2,}\.)+[(com)(ru)(by)]/
  let regexPass = /[^-\W]{8,16}/

  if (!(minLenName <= name.length <= maxLenName)) {
    validationError.nameInput.push(
      `Поле имя должно содержать от ${minLenName} до ${maxLenName} символов`,
    )
    dataIsValid = false
  }

  if (regexName.test(name)) {
    validationError.nameInput.push('Поле имя может содержать только буквы и цифры')
    dataIsValid = false
  }

  // переписать ошибку
  if (!regexEmail.test(email)) {
    validationError.emailInput.push('Поле email не валидно')
    dataIsValid = false
  }

  if (!(minPasswordLen <= password.length <= maxPasswordLen)) {
    validationError.passwordInput.push(
      `Пароль должен содержать от ${minPasswordLen} до ${maxPasswordLen} символов`,
    )
    dataIsValid = false
  }

  if (regexPass.test(password)) {
    validationError.passwordInput.push(
      "Пароль может содержать только латинские буквы, цифры и знаки '_ -'",
    )
    dataIsValid = false
  }

  if (password != conf_password) {
    console.log('Password is not confirm!')
    validationError.passwordConfInput.push('Пароли не совпадают.')
    dataIsValid = false
  }
  return { dataIsValid, validationError }
}

function validateName(name, minLenName = 3, maxLenName = 16) {
  let notValidRegex = /[^\w]/
  let validationError = []

  if (name.length < minLenName) {
    validationError.push('Поле имя должно содержать не менее ' + minLenName + 'х символов.')
  } else if (name.length > maxLenName) {
    validationError.push('Поле имя должно содержать не более ' + maxLenName + 'х символов.')
  }

  if (notValidRegex.test(name)) {
    validationError.push('Поле имя может содержать латинские буквы, цифры и символ подчёркивания.')
  }

  return { isValid: validationError.length > 0 ? false : true, errors: validationError }
}

function validateText(text, minLength = 0, maxLength = null) {
  let notValidRegex = /[<>]/
  let validationError = []

  if (text.length < minLength) {
    validationError.push('Минимально допустимая длина текста ' + minLength + ' символов')
  }

  if (maxLength != null && text.length > maxLength) {
    validationError.push('Максимально допустимая длина текста ' + maxLength + ' символов')
  }

  if (notValidRegex.test(text)) {
    validationError.push('Текст содержит недопустимые символы "< >".')
  }

  return { isValid: validationError.length > 0 ? false : true, errors: validationError }
}

function validateEmail(email, minLength = 8, maxLength = 255) {
  // let validRegex = /[-.\w]{3,}@[-\w]{2,}\.((com)|(by)|(ru))/g

  // вынести отдельно проверку доменов com,by,ru и т.д
  let validRegex = /^\w+[-.\w]{2,}@\w+[-.\w]{2,}\w+\.((com)|(by)|(ru)|(pl))$/
  let validationError = []

  if (email.length < minLength) {
    validationError.push('Минимальная длинна email ' + minLength + ' символов.')
  }

  if (email.length > maxLength) {
    validationError.push('Максимальна длинна email ' + maxLength + ' символов.')
  }

  if (!validRegex.test(email)) {
    validationError.push('Убедитесь в корректности введенного email.')
  }

  return { isValid: validationError.length > 0 ? false : true, errors: validationError }
}

function validatePassword(password, minPasswordLen = 8, maxPasswordLen = 16) {
  // let notValidRegex = /[^-\W]/
  let notValidRegex = /[^\w!?-]/g
  let validationError = []

  if (password.length < minPasswordLen) {
    validationError.push('Минимальная длина пароля ' + minPasswordLen + ' символов.')
  }

  if (password.length > maxPasswordLen) {
    validationError.push('Максимальная длина пароля ' + maxPasswordLen + ' символов.')
  }

  if (notValidRegex.test(password)) {
    validationError.push('Пароль может содержать латинские буквы, цифры и символы "!?_-".')
  }

  return { isValid: validationError.length > 0 ? false : true, errors: validationError }
}

export { validateFormData, validateName, validateEmail, validatePassword, validateText }
