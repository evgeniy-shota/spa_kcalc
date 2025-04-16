export default function storageAvailable(type) {
  let storage
  try {
    storage = window[type]
    const testVal = '__storage_test_Val__'
    storage.setItem(testVal, testVal)
    storage.removeItem(testVal)
    return true
  } catch (error) {
    return (
      error instanceof DOMException &&
      error.name === 'QuotaExceededError' &&
      storage &&
      storage.length !== 0
    )
  }
}
