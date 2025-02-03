function getTime() {
  let date = new Date()
  let hours = String(date.getHours())
  let minutes = String(date.getMinutes())
  let seconds = String(date.getSeconds())

  let resHourse = hours.length == 1 ? '0' + hours : hours
  let resMinutes = minutes.length == 1 ? '0' + minutes : minutes
  let resSeconds = seconds.length == 1 ? '0' + seconds : seconds
  return `${resHourse}:${resMinutes}:${resSeconds}`
}

export default getTime
