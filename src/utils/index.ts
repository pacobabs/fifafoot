export const normalize = (string: string) =>
  string
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const dayFormat = { weekday: 'short', month: 'short', day: 'numeric' }

const hourFormat = { hour12: false, hour: '2-digit', minute: '2-digit' }

const capitalize = (string: string) => string[0].toUpperCase() + string.slice(1)

export const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export const getLocaleMatchDayTime = (MatchDate: string) => {
  const matchDate = new Date(MatchDate)
  const time = matchDate.toLocaleTimeString([], hourFormat)
  return `${getLocaleMatchDay(MatchDate)}, ${time}`
}

export const getLocaleMatchDay = (MatchDate: string) => {
  const matchDate = new Date(MatchDate)
  const anotherYear = matchDate.getFullYear() !== new Date().getFullYear()
  const yearOptions = anotherYear ? { year: 'numeric' } : {}
  const dateFormat = { ...dayFormat, ...yearOptions }
  const dayInMs = 1000 * 60 * 60 * 24
  const days = (matchDate.getTime() - Date.now()) / dayInMs
  const moment = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const day =
    days >= -1 && days <= 1
      ? capitalize(moment.format(days > 0 ? Math.round(days) : Math.trunc(days), 'day'))
      : matchDate.toLocaleDateString([], dateFormat)
  return day
}

export const getMatchStatus = (MatchStatus: number, MatchDate: string, TimeDefined: boolean) => {
  switch (MatchStatus) {
    case 0: {
      return 'FULL TIME'
    }
    case 1: {
      // 'MATCH YET TO START'
      if (!TimeDefined) return ''
      const moment = new Intl.RelativeTimeFormat()
      const { time, unit } = getRelativeTime(MatchDate)
      return time < 0 ? 'STARTING SOON' : capitalize(moment.format(Math.round(time), unit))
    }
    case 3: {
      return 'MATCH LIVE'
    }
    case 4: {
      return 'ABANDONED'
    }
    case 7: {
      return 'POSTPONED'
    }
    case 8: {
      return 'CANCELLED'
    }
    case 12: {
      return 'LINEUPS'
    }
  }
}

export const isMatchAvailable = (MatchStatus: number) =>
  MatchStatus !== 0 && MatchStatus !== 4 && MatchStatus !== 7 && MatchStatus !== 8

export const isMatchCancelled = (MatchStatus: number) => MatchStatus !== 4 && MatchStatus !== 7 && MatchStatus !== 8

export const getRelativeTime = (matchDate: string) => {
  const remainingTime = new Date(matchDate).getTime() - Date.now() // milliseconds
  let time = remainingTime / 1000
  let unit = 'second'
  if (Math.abs(time) > 60) {
    time /= 60
    unit = 'minute'
  } else return { time, unit, remainingTime }
  if (Math.abs(time) > 60) {
    time /= 60
    unit = 'hour'
  } else return { time, unit, remainingTime }
  if (Math.abs(time) > 24) {
    time /= 24
    unit = 'day'
  } else return { time, unit, remainingTime }
  if (Math.abs(time) > 7) {
    time /= 7
    unit = 'week'
  } else return { time, unit, remainingTime }
  if (Math.abs(time) > 4) {
    time /= 4
    unit = 'month'
  } else return { time, unit, remainingTime }
  if (Math.abs(time) > 12) {
    time /= 12
    unit = 'year'
  }
  return { time, unit, remainingTime }
}
