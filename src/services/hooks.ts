import { useEffect, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import useSWR from 'swr'
import { fetcher } from './index'
import { isMatchPollable, getRelativeTime, normalize } from '@utils'
import { useDispatch } from '@store'
import { useCompetitions, useTeams, useMatches } from '@store/selectors'
import { setMatches, setMatch } from '@store/actions'
import { Result, Competition, Match, MatchEvents, Standing } from '@services/types'

const SECONDS_TO_REFRESH = 10

export const useSearch = () => {
  const [term, setSearch] = useState('')
  const onChange = (term: string) => setSearch(term)
  const search = useCallback(debounce(onChange, 66.6666666666), [])
  const find = (name: string) => normalize(name).includes(normalize(term))
  return { term, search, find }
}

export const useCalendarData = (type: string, selected: string) => {
  const { matches } = useMatches()
  const { IdCompetition = '', IdSeason = '' } = useCurrentSeasonInfo(type, selected)
  const loaded = matches[IdCompetition] ? true : false
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
  }, [results, IdCompetition, dispatch, loaded, type, selected])
  return { matches, IdCompetition }
}

export const useLiveMatchesData = () => {
  const { matches } = useMatches()
  const loaded = matches['live'] ? true : false
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
  }, [results, dispatch, loaded])
  return { matches }
}

export const useMatchData = (IdCompetition: string, IdSeason: string, IdStage: string, IdMatch: string) => {
  const fetchOptions = {
    fetcher,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  }
  const { data: match } = useSWR<Match>(
    `live/football/${IdCompetition}/${IdSeason}/${IdStage}/${IdMatch}`,
    fetchOptions
  )
  const { data: standings } = useSWR<Result<Standing>>(
    `calendar/${IdCompetition}/${IdSeason}/${IdStage}/Standing`,
    fetchOptions
  )
  const { data: events } = useSWR<MatchEvents>(
    `timelines/${IdCompetition}/${IdSeason}/${IdStage}/${IdMatch}`,
    fetchOptions
  )
  return { match, standings: standings ? standings.Results : [], events: events ? events.Event : [] }
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
  }, [newMatchData, dispatch])
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
    if (!TimeDefined || !isMatchPollable(MatchStatus)) return undefined
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
      remainingTime > 0 && console.log(MatchDate, MatchStatus)
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
  if (id && view === 'TEAM') {
    const team = teams.find(({ IdTeam }) => id === IdTeam)
    return { IdCompetition: team?.IdCompetition, IdSeason: team?.IdSeason }
  }
  if (id && view === 'COMPETITION') {
    const competition = competitions.find(({ IdCompetition }) => id === IdCompetition)
    const season = teams.find(({ IdCompetition }) => IdCompetition === competition?.IdCompetition)
    return { IdCompetition: competition?.IdCompetition, IdSeason: season?.IdSeason }
  }
  return { IdCompetition: '', IdSeason: '' }
}

export const usePopularCompetitions = () => {
  const { competitions } = useCompetitions()
  return competitions.filter(({ IdMemberAssociation, Name }) => {
    const premierLeague = IdMemberAssociation[0] === 'ENG' && Name[0].Description === 'Premier League'
    const laLiga = IdMemberAssociation[0] === 'ESP' && Name[0].Description === 'LaLiga Santander'
    const bundesliga = IdMemberAssociation[0] === 'GER' && Name[0].Description === 'Bundesliga'
    const serieA = IdMemberAssociation[0] === 'ITA' && Name[0].Description === 'Serie A TIM'
    const ligue1 = IdMemberAssociation[0] === 'FRA' && Name[0].Description === 'Ligue 1 Conforama'
    const championsLeague = Name[0].Description === 'UEFA Champions League'
    const europaLeague = Name[0].Description === 'UEFA Europa League'
    return premierLeague || laLiga || bundesliga || serieA || ligue1 || championsLeague || europaLeague
  })
}

export const usePopularTeams = () => {
  const { teams } = useTeams()
  return teams.filter(({ IdTeam }) => {
    const liv = IdTeam === '27959'
    const barca = IdTeam === '1903416'
    const real = IdTeam === '30504'
    const bayern = IdTeam === '1914810'
    const psg = IdTeam === '33191'
    const juve = IdTeam === '31085'
    const city = IdTeam === '33337'
    return liv || barca || real || juve || bayern || psg || city
  })
}

export const VIEW = {
  ALL: 'ALL',
  POPULAR: 'POPULAR',
  FAVORITES: 'FAVORITES',
  TEAM: 'TEAM',
  COMPETITION: 'COMPETITION'
}

export const useFilter = (params: string, populars: Competition[], live = false) => {
  const { competitions, myCompetitions } = useCompetitions()
  const { myTeams } = useTeams()
  const [filterParam, typeParam, idParam] = params.split('/')
  const filter = filterParam || (live ? VIEW.ALL : VIEW.POPULAR)
  const selected = idParam || (live ? 'ALL' : getDefaultId(filter, populars, competitions, myCompetitions, myTeams))
  const type = typeParam || (filter === VIEW.FAVORITES ? getDefaultType(myCompetitions) : VIEW.COMPETITION)
  return { filter, type, selected }
}

const getDefaultId = (
  filter: string,
  populars: Competition[],
  competitions: Competition[],
  myCompetitions: string[],
  myTeams: string[]
) => {
  switch (filter) {
    case VIEW.ALL:
      return competitions[0].IdCompetition
    case VIEW.FAVORITES:
      return myCompetitions[0] || myTeams[0]
    default:
      return populars[0].IdCompetition
  }
}

const getDefaultType = (myCompetitions: string[]) => {
  return myCompetitions.length ? VIEW.COMPETITION : VIEW.TEAM
}
