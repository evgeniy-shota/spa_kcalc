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

function getDate() {
  let date = new Date()

  let year = String(date.getFullYear())
  let month = String(date.getMonth() + 1)
  let day = String(date.getDate())

  let resMonth = month.length == 1 ? '0' + month : month
  let resDay = day.length == 1 ? '0' + day : day

  return `${year}-${resMonth}-${resDay}`
}

export { getTime, getDate }
