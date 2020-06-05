import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from './index'
import { isMatchAvailable, getRelativeTime } from '@utils'
import { useDispatch } from '@store'
import { useCompetitions, useTeams } from '@store/selectors'
import { setMatches, setMatch } from '@store/actions'
import { Result, Match } from '@services/types'

const SECONDS_TO_REFRESH = 10

export const useCalendarCompetitionData = (loaded: boolean, IdCompetition: string, IdSeason: string) => {
  if (!IdCompetition && !IdSeason) return
  const dispatch = useDispatch()
  const { data } = useSWR<Result<Match>>(
    `calendar/matches?IdCompetition=${IdCompetition}&IdSeason=${IdSeason}&count=1000`,
    {
      fetcher,
      revalidateOnMount: !loaded,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
  const results = data?.Results ?? []
  useEffect(() => {
    if (loaded || results.length === 0) return undefined
    dispatch(setMatches(IdCompetition, results))
  }, [results])
}

export const useLiveMatchesData = (loaded: boolean) => {
  const dispatch = useDispatch()
  const { data } = useSWR<Result<Match>>(`live/football?count=1000`, {
    fetcher,
    revalidateOnMount: !loaded,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  const results = data?.Results ?? []
  useEffect(() => {
    if (loaded || results.length === 0) return undefined
    dispatch(setMatches('live', results))
  }, [results])
}

export const useMatchData = (IdCompetition: string, IdSeason: string, IdStage: string, IdMatch: string) => {
  const { data } = useSWR<Match>(`live/football/${IdCompetition}/${IdSeason}/${IdStage}/${IdMatch}`, {
    fetcher,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return data
}

export const useLiveMatchData = (match: Match) => {
  const dispatch = useDispatch()
  const { IdMatch, IdCompetition, IdSeason, IdStage, MatchStatus, TimeDefined, Date: MatchDate } = match
  const [live, setLive] = useState(MatchStatus === 3)
  const [refreshInterval, setRefreshInterval] = useState(0)
  const { data: newMatchData } = useSWR<Match>(
    live ? [`live/football/${IdCompetition}/${IdSeason}/${IdStage}/${IdMatch}`, live, refreshInterval] : null,
    {
      fetcher,
      refreshInterval,
      dedupingInterval: refreshInterval
    }
  )
  useMatchCountDown(TimeDefined, MatchStatus, MatchDate, setLive, setRefreshInterval)
  useEffect(() => {
    if (!newMatchData || newMatchData?.MatchStatus !== 0) return undefined
    setLive(false)
    dispatch(setMatch('live', newMatchData))
  }, [newMatchData])
  return newMatchData || match
}

const useMatchCountDown = (
  TimeDefined: boolean,
  MatchStatus: number,
  MatchDate: string,
  setLive: (live: boolean) => void,
  setRefreshInterval: (interval: number) => void
) => {
  const [clock, setClock] = useState(getRelativeTime(MatchDate))
  useEffect(() => {
    if (!TimeDefined || isMatchAvailable(MatchStatus)) return undefined
    const { remainingTime } = clock
    const remainingMinutes = remainingTime / 60000
    let timeout: NodeJS.Timer
    let clockRefreshInterval = 1000 // every second refresh timer
    if (remainingMinutes <= 5) {
      setLive(true)
      setRefreshInterval(SECONDS_TO_REFRESH * 1000)
    } else if (remainingMinutes <= 65) {
      setLive(true)
      clockRefreshInterval = 60 * 1000 // every minute refresh timer
      setRefreshInterval(10 * 60 * 1000) // refresh match data every 10 minutes
      timeout = setTimeout(() => {
        setRefreshInterval(SECONDS_TO_REFRESH * 1000)
      }, (remainingMinutes - 5) * 60 * 1000)
    } else {
      clockRefreshInterval = 60 * 60 * 1000 // every hour refresh timer
      timeout = setTimeout(() => {
        setLive(true)
      }, (remainingMinutes - 65) * 60 * 1000)
    }
    const clockInterval = setInterval(() => {
      remainingTime > 0 && setClock(getRelativeTime(MatchDate))
    }, clockRefreshInterval)
    return () => {
      timeout && clearTimeout(timeout)
      clearInterval(clockInterval)
    }
  }, [])
}

export const useCurrentSeasonInfo = (view: string, id: string) => {
  const { teams } = useTeams()
  const { competitions } = useCompetitions()
  if (view === 'TEAM') {
    const team = teams.find(({ IdTeam }) => id === IdTeam)
    return { IdCompetition: team?.IdCompetition, IdSeason: team?.IdSeason }
  }
  if (view === 'COMPETITION') {
    const competition = competitions.find(({ IdCompetition }) => id === IdCompetition)
    const season = teams.find(({ IdCompetition }) => IdCompetition === competition?.IdCompetition)
    return { IdCompetition: competition?.IdCompetition, IdSeason: season?.IdSeason }
  }
  return { IdCompetition: '', IdSeason: '' }
}
