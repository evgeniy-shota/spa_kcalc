function roundTo(num, precision = 1) {
  let factor = Math.pow(10, precision)
  return Math.round(num * factor) / factor
}

export default roundTo
