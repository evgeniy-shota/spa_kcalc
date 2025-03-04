function filterNumberInput(keyCode) {
  const allowedSymbalsCode = [8, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 190]

  if (allowedSymbalsCode.includes(keyCode)) {
    return true
  }
  return false
}

export { filterNumberInput }
