import dayjs from "dayjs"
import i18n from "i18n-js"

export function dateFormat(date: string | Date, format = "YYYY/MM/DD"): string {
  return dayjs(date).format(format)
}

export function dateHumanize(date: Date): string {
  if (checkInTheSameDay(date)) {
    return dayjs(date).format("h:mm A")
  }
  if (checkInTheSameWeek(date)) {
    return dayjs(date).format("dddd")
  }
  return dayjs(date).format("DD/MM/YYYY")
}

export function formatBackupDate(date: Date): string {
  if (checkInTheSameDay(date)) {
    return dayjs(date).format("h:mm A")
  }
  if (checkInTheSameWeek(date)) {
    return dayjs(date).format("dddd, h:mm A")
  }
  return dayjs(date).format("DD/MM/YYYY, h:mm A")
}

export function fullDateYYYYString(date: Date): string {
  let day
  if (checkInTheSameDay(date)) {
    day = i18n.translate('common.today') + dayjs(date).format("h:mm A")
  }else if (checkInTomorrow(date)) {
    day = i18n.translate('common.tomorrow') + dayjs(date).format("h:mm A")
  }
  else if (checkInYesterday(date)) {
    day = i18n.translate('common.yesterday') + dayjs(date).format("h:mm A")
  }else {
    day = dayjs(date).format("dddd DD/MMMM/YYYY h:mm A")
  }
  return day
}

export function fullDateString(date: Date): string {
  let day
  if (checkInTheSameDay(date)) {
    day = i18n.translate('common.today')  + dayjs(date).format("h:mm A")
  }else if (checkInTomorrow(date)) {
    day = i18n.translate('common.tomorrow') + dayjs(date).format("h:mm A")
  }
  else if (checkInYesterday(date)) {
    day = i18n.translate('common.yesterday') + dayjs(date).format("h:mm A")
  }else {
    day = dayjs(date).format("dddd, MMMM YY h:mm A")
  }
  return day
}

export function fullDateHMAString(date: Date): string {
  let day
  if (checkInTheSameDay(date)) {
    day = i18n.translate('common.today') + dayjs(date).format("h:mm A")
  }else if (checkInTomorrow(date)) {
    day = i18n.translate('common.tomorrow') + dayjs(date).format("h:mm A")
  }
  else if (checkInYesterday(date)) {
    day = i18n.translate('common.yesterday') + dayjs(date).format("h:mm A")
  }else {
    day = dayjs(date).format("DD/MM/YYYY h:mm A")
  }
  return day
}

export function formatTime (date: Date) {
    return dayjs(date).format("h:mm A");
}

export function checkInTheSameDay(date: Date) {
  return dayjs().isSame(dayjs(date), "day")
}

export function checkInTomorrow(date: Date) {
  const tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)
  return dayjs(tomorrow).isSame(dayjs(date), "day")
}

export function checkInYesterday(date: Date) {
  const yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)
  return dayjs(yesterday).isSame(dayjs(date), "day")
}

export function checkInLastWeek(date: Date) {
  const week = new Date()
  week.setDate(new Date().getDate() - 1)
  return dayjs(week).isSame(dayjs(date), "week")
}

export function checkInLastMonth(date: Date) {
  const month = new Date()
  month.setDate(new Date().getDate() - 1)
  return dayjs(month).isSame(dayjs(date), "month")
}

export function checkInTheSameWeek(date: Date) {
  return dayjs().isSame(dayjs(date), "week")
}

export function checkInTheSameMonth(date: Date) {
  return dayjs().isSame(dayjs(date), "month")
}

// export function correctNewDate() {
//   return new Date(new Date().getTime() - configsStore.timeDifference)
// }


export function toHHMMSS(secs) {
  const secNum = parseInt(secs, 10)
  const hours = Math.floor(secNum / 3600)
  const minutes = Math.floor(secNum / 60) % 60
  const seconds = secNum % 60

  return [hours, minutes, seconds]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}
