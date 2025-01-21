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

export default validateFormData
