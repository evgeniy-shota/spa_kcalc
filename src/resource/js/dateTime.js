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

function getDate(offsetNum = 0, defaultDate = '', offsetScale = 'd') {
  let msInSec = 1000
  let msInHour = msInSec * 60 * 60
  let msInDay = msInHour * 24
  let msInWeek = msInDay * 7
  let offsetMs =
    offsetNum * (offsetScale == 'd' ? msInDay : offsetScale == 'w' ? msInDay * 7 : msInDay * 30)

  // console.log(new Date(Date.now() + offsetMs))
  let currentDate = new Date(
    (defaultDate.length > 0 ? new Date(defaultDate).getTime() : Date.now()) + offsetMs,
  )

  let year = String(currentDate.getFullYear())
  let month = String(currentDate.getMonth() + 1)
  let day = String(currentDate.getDate())

  let resMonth = month.length == 1 ? '0' + month : month
  let resDay = day.length == 1 ? '0' + day : day

  return `${year}-${resMonth}-${resDay}`
}

export { getTime, getDate }
