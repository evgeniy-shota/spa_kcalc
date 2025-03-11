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

const dayOfWeekShortRu = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const dayOfWeekShortEn = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']

const dayOfWeekEn = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

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

function getDayOfWeek(y, m = 0, d = 1, lang = 'ru') {
  let day = new Date(y, m, d).getDay()

  if (lang == 'ru') {
    return day == 0 ? 6 : day - 1
  }

  return day
}

function getDayCountInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getYear(offsetNum = 0, defaultDate = '') {
  const yearOffset = 31536000000 * offsetNum
  return new Date(new Date(defaultDate).getTime() + yearOffset).getFullYear()
}

function getMonthName(month, lang = 'ru', short = true) {
  if (lang == 'ru') {
    if (short) {
      return monthShortNameRu[month]
    }
    return monthNameRu[month]
  }

  if (lang == 'en') {
    if (short) {
      return monthShortNameEn[month]
    }
    return monthNameEn[month]
  }

  return null
}

function getDateFromString(dateStr) {
  if (!dateStr) {
    return null
  }
  let date = new Date(Date.parse(dateStr))
  return getDate(true, true, true, date.getFullYear(), date.getMonth(), date.getDate())
}

function getTimeWithOffset(time, offsetNum = 0) {
  console.log(time + '+' + offsetNum)

  let msInSec = 1000
  let msInHour = msInSec * 60 * 60
  let msInDay = msInHour * 24
  let offsetMs = msInDay * offsetNum

  return new Date(time + offsetMs).getTime()
}

function getDateWithOffset(time, offsetNum = 0) {
  console.log(time + '+' + offsetNum)

  let msInSec = 1000
  let msInHour = msInSec * 60 * 60
  let msInDay = msInHour * 24
  let offsetMs = msInDay * offsetNum

  return getDate(time + offsetMs)
}

function getDateYMD(y, m = 0, d = 1) {
  return getDate(new Date(y, m, d).getTime())
}

function getDate(time = Date.now()) {
  // // console.log(new Date(Date.now() + offsetMs))
  // let currentDate = new Date(
  //   (defaultDate.length > 0 ? new Date(defaultDate).getTime() : Date.now()) + offsetMs,
  // )

  let currentDate = new Date(time)

  let year = currentDate.getFullYear()
  let month = currentDate.getMonth()
  let date = currentDate.getDate()
  let numDayOfWeek = currentDate.getDay()
  let numDayOfWeekRu = (dayOfWeek) => (dayOfWeek == 0 ? 6 : dayOfWeek - 1)

  return {
    time: currentDate.getTime(),
    date: date,
    month: month,
    year: year,
    ymd:
      year +
      '-' +
      (String(month + 1).length == 1 ? '0' + String(month + 1) : month + 1) +
      '-' +
      (String(date).length == 1 ? '0' + String(date) : date),
    dayOfWeekRu: numDayOfWeekRu(numDayOfWeek),
    nameDayOfWeekRu: dayOfWeekRu[numDayOfWeekRu(numDayOfWeek)],
    dayOfWeekEn: numDayOfWeek,
    nameDayOfWeekEn: dayOfWeekEn[numDayOfWeek],
  }

  // year = String(year)
  // month = monthName ? getMonthName(month, lang, short) : String(month + 1)
  // date = String(date)

  // let resMonth = month.length == 1 ? '0' + month : month
  // let resDate = date.length == 1 ? '0' + date : date

  // return `${year}-${resMonth}-${resDate}`
}

export {
  getTime,
  getYear,
  getDate,
  getDateYMD,
  getMonthName,
  getDayOfWeek,
  getDateWithOffset,
  getTimeWithOffset,
  getDayCountInMonth,
  getDateFromString,
  monthNameRu,
  monthShortNameRu,
  monthNameEn,
  monthShortNameEn,
  dayOfWeekShortRu,
  dayOfWeekShortEn,
}
