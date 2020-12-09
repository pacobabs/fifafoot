import { MatchEvent, Match } from '@services/types'

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

export const getLocaleMatchTime = (MatchDate: string) => {
  const matchDate = new Date(MatchDate)
  return matchDate.toLocaleTimeString([], hourFormat).replace('24', '00')
}

export const getLocaleMatchDayTime = (MatchDate: string) => {
  return `${getLocaleMatchDay(MatchDate)} - ${getLocaleMatchTime(MatchDate)}`
}

export const getLocaleMatchDay = (MatchDate: string) => {
  const matchDate = new Date(MatchDate)
  const anotherYear = matchDate.getFullYear() !== new Date().getFullYear()
  const yearOptions = anotherYear ? { year: 'numeric' } : {}
  const dateFormat = { ...dayFormat, ...yearOptions }
  const dayInMs = 1000 * 60 * 60 * 24
  const days = (matchDate.getTime() - Date.now()) / dayInMs
  const moment = new Intl.RelativeTimeFormat('en', { numeric: 'auto', style: 'short' })
  const day =
    days >= -1 && days <= 1
      ? capitalize(moment.format(days > 0 ? Math.floor(days) : Math.trunc(days), 'day'))
      : matchDate.toLocaleDateString([], dateFormat)
  return day
}

export const getMatchStatus = (MatchStatus: number, MatchDate: string, TimeDefined: boolean) => {
  switch (MatchStatus) {
    case 0: {
      return 'FULL TIME'
    }
    case 12:
    case 1: {
      // 'MATCH YET TO START'
      if (!TimeDefined) return 'No time'
      const moment = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      const { time, unit } = getRelativeTime(MatchDate)
      return time <= 0 ? 'STARTING SOON' : capitalize(moment.format(Math.round(time), unit))
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
    case 99: {
      return 'STOPPED'
    }
  }
}

export const isMatchplayed = (MatchStatus: number) => MatchStatus === 0 || MatchStatus === 3

export const isMatchPollable = (MatchStatus: number) => MatchStatus === 1 || MatchStatus === 3 || MatchStatus === 12

export const getRelativeTime = (matchDate: string) => {
  const remainingTime = Math.max(0, new Date(matchDate).getTime() - Date.now()) // milliseconds
  let time = remainingTime / 1000
  let unit = 'second' as Intl.RelativeTimeFormatUnit
  if (time > 60) {
    time /= 60
    unit = 'minute'
  } else return { time, unit, remainingTime }
  if (time > 60) {
    time /= 60
    unit = 'hour'
  } else return { time, unit, remainingTime }
  if (time > 24) {
    time /= 24
    unit = 'day'
  } else return { time, unit, remainingTime }
  if (time > 7) {
    time /= 7
    unit = 'week'
  } else return { time, unit, remainingTime }
  if (time > 4) {
    time /= 4
    unit = 'month'
  } else return { time, unit, remainingTime }
  if (time > 12) {
    time /= 12
    unit = 'year'
  }
  return { time, unit, remainingTime }
}

const teamStats = {
  shots: 0,
  blockedShots: 0,
  fouls: 0,
  offsides: 0,
  corners: 0
}

export const getMatchStats = (match: Match, events: MatchEvent[]) => {
  const { AwayTeam, HomeTeam, BallPossession } = match
  const stats = {
    [AwayTeam.IdTeam]: {
      ...teamStats,
      possession: BallPossession?.OverallAway,
      yellowCards: AwayTeam.Bookings.filter(({ Card }) => Card === 1 || Card === 3).length,
      redCards: AwayTeam.Bookings.filter(({ Card }) => Card === 2 || Card === 3).length
    },
    [HomeTeam.IdTeam]: {
      ...teamStats,
      possession: BallPossession?.OverallHome,
      yellowCards: HomeTeam.Bookings.filter(({ Card }) => Card === 1 || Card === 3).length,
      redCards: HomeTeam.Bookings.filter(({ Card }) => Card === 2 || Card === 3).length
    }
  }
  events.map(({ Type, IdTeam }) => {
    switch (Type) {
      case 0:
      case 41:
      case 32:
      case 33:
        return
      case 12: {
        stats[IdTeam].shots += 1
        return
      }
      case 15: {
        stats[IdTeam].offsides += 1
        return
      }
      case 16: {
        stats[IdTeam].corners += 1
        return
      }
      case 17: {
        stats[IdTeam].blockedShots += 1
        return
      }
      case 18: {
        stats[IdTeam].fouls += 1
        return
      }
      default:
        return null
    }
  })
  return stats
}
