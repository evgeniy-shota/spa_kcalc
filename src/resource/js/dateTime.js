const monthNameRu = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
]
const monthShortNameRu = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
]

const monthNameEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const monthShortNameEn = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const dayOfWeekRu = [
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
  'воскресенье',
]

const dayOfWeekShortRu = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

const dayOfWeekEn = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const dayOfWeekShortEn = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function getTime(full = true, returnObj = false) {
  let date = new Date()

  let hours = String(date.getHours())
  let minutes = String(date.getMinutes())
  let seconds = String(date.getSeconds())

  let resHourse = hours.length == 1 ? '0' + hours : hours
  let resMinutes = minutes.length == 1 ? '0' + minutes : minutes
  let resSeconds = seconds.length == 1 ? '0' + seconds : seconds

  if (returnObj) {
    return {
      hours: resHourse,
      minutes: resMinutes,
      seconds: full ? resSeconds : null,
    }
  }

  // let res = `${resHourse}:${resMinutes}` + (full ? `:${resSeconds}` : '')
  return `${resHourse}:${resMinutes}` + (full ? `:${resSeconds}` : '')
}

function getYear(offsetNum = 0, defaultDate = '') {
  const yearOffset = 31536000000 * offsetNum
  return new Date(new Date().getTime() + yearOffset).getFullYear()
}

function getDate(offsetNum = 0, defaultDate = '', offsetScale = 'd', returnObj = false) {
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

  let year = currentDate.getFullYear()
  let month = currentDate.getMonth()
  let day = currentDate.getDate()

  if (returnObj) {
    return {
      day: day,
      month: month,
      year: year,
    }
  }

  year = String(year)
  month = String(month + 1)
  day = String(day)

  let resMonth = month.length == 1 ? '0' + month : month
  let resDay = day.length == 1 ? '0' + day : day

  return `${year}-${resMonth}-${resDay}`
}

export { getTime, getYear, getDate, monthNameRu, monthShortNameRu, monthNameEn, monthShortNameEn }
