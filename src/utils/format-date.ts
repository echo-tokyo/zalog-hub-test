const weekdayFormat = new Intl.DateTimeFormat('ru', { weekday: 'long' })
const dayMonthFormat = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
})

export function formatWeekday(date: Date) {
  return weekdayFormat.format(date)
}

export function formatDayMonth(date: Date) {
  return dayMonthFormat.format(date)
}
