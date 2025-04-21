function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const val = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    val[key] = deepCopy(obj[key])
  }
  return val
}

export { deepCopy }
