import { TIMEZONE } from '@/config/site'
import type { WorkingDay, WorkingHoursView } from '@/types/content'

const SHORT_LABELS: Record<string, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
}

/** "09:00" → "9:00 AM" */
export const formatTime = (value: string): string => {
  const [hourPart, minutePart = '00'] = value.split(':')
  const hour = Number(hourPart)
  if (Number.isNaN(hour)) return value
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return minutePart === '00'
    ? `${displayHour} ${suffix}`
    : `${displayHour}:${minutePart} ${suffix}`
}

export const formatDayHours = (day: WorkingDay): string =>
  day.isClosed || !day.openTime || !day.closeTime
    ? 'Closed'
    : `${formatTime(day.openTime)} – ${formatTime(day.closeTime)}`

/**
 * Condenses the week into one line, e.g. "Mon–Fri, Sun · 9 AM – 9 PM".
 * Falls back to listing days when timings differ across the week.
 */
export const hoursSummary = (hours: WorkingHoursView): string => {
  const open = hours.days.filter((day) => !day.isClosed && day.openTime && day.closeTime)
  if (open.length === 0) return 'Timings on request'

  const sameTimings = open.every(
    (day) => day.openTime === open[0].openTime && day.closeTime === open[0].closeTime,
  )

  const groups: string[] = []
  let runStart: WorkingDay | null = null
  let runEnd: WorkingDay | null = null

  const flush = () => {
    if (!runStart || !runEnd) return
    const start = SHORT_LABELS[runStart.day] ?? runStart.label
    const end = SHORT_LABELS[runEnd.day] ?? runEnd.label
    groups.push(runStart === runEnd ? start : `${start}–${end}`)
    runStart = null
    runEnd = null
  }

  for (const day of hours.days) {
    const isOpen = !day.isClosed && Boolean(day.openTime) && Boolean(day.closeTime)
    if (isOpen) {
      runStart ??= day
      runEnd = day
    } else {
      flush()
    }
  }
  flush()

  const dayPart = groups.join(', ')
  return sameTimings ? `${dayPart} · ${formatDayHours(open[0])}` : dayPart
}

type LocalNow = { day: string; minutes: number }

/** Current weekday and minutes-since-midnight in the factory's timezone. */
export const nowInTimezone = (date: Date = new Date(), timeZone = TIMEZONE): LocalNow => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  const hour = Number(get('hour'))
  const minute = Number(get('minute'))

  return {
    day: get('weekday').toLowerCase(),
    minutes: (Number.isNaN(hour) ? 0 : hour) * 60 + (Number.isNaN(minute) ? 0 : minute),
  }
}

const toMinutes = (value: string): number | null => {
  const [hour, minute] = value.split(':').map(Number)
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null
  return hour * 60 + minute
}

export type OpenStatus = {
  isOpen: boolean
  today: WorkingDay | null
  /** e.g. "Opens 9 AM" or "Closes 9 PM" — short line shown next to the badge. */
  detail: string
}

export const getOpenStatus = (hours: WorkingHoursView, date: Date = new Date()): OpenStatus => {
  const { day, minutes } = nowInTimezone(date)
  const today = hours.days.find((entry) => entry.day === day) ?? null

  if (!today || today.isClosed || !today.openTime || !today.closeTime) {
    const nextOpen = nextOpenDay(hours, day)
    return {
      isOpen: false,
      today,
      detail: nextOpen ? `Opens ${SHORT_LABELS[nextOpen.day] ?? nextOpen.label} ${formatTime(nextOpen.openTime)}` : '',
    }
  }

  const open = toMinutes(today.openTime)
  const close = toMinutes(today.closeTime)
  if (open === null || close === null) return { isOpen: false, today, detail: '' }

  if (minutes < open) return { isOpen: false, today, detail: `Opens ${formatTime(today.openTime)}` }
  if (minutes >= close) {
    const nextOpen = nextOpenDay(hours, day)
    return {
      isOpen: false,
      today,
      detail: nextOpen ? `Opens ${SHORT_LABELS[nextOpen.day] ?? nextOpen.label} ${formatTime(nextOpen.openTime)}` : '',
    }
  }

  return { isOpen: true, today, detail: `Closes ${formatTime(today.closeTime)}` }
}

const nextOpenDay = (hours: WorkingHoursView, fromDay: string): WorkingDay | null => {
  const index = hours.days.findIndex((day) => day.day === fromDay)
  if (index === -1) return null
  for (let step = 1; step <= 7; step += 1) {
    const day = hours.days[(index + step) % hours.days.length]
    if (day && !day.isClosed && day.openTime) return day
  }
  return null
}
