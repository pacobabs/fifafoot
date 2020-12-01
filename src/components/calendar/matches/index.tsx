import React, { useState, useEffect, useRef } from 'react'
import { useCalendarData, usePopularCompetitions, useFilter, VIEW, useSearch } from '@services'
import Match from '@components/common/match'
import Filters from '@components/common/filters'
import Competitions from './competitions-list'
import Teams from './teams-list'
import MatchDateInfo from './matchdate-info'
import MatchDayInfo from './matchday-info'
import useScrollLoader from '@components/common/loader'
import { Match as MatchType } from '@services/types'

type Props = {
  path: string
  params?: string
}

const Calendar = ({ params = '' }: Props) => {
  console.count('Calendar')
  const { term, search, find } = useSearch()
  const [visibleMatches, setMatches] = useState<MatchType[]>([])
  const topSpinnerRef = useRef<HTMLDivElement | null>(null)
  const bottomSpinnerRef = useRef<HTMLDivElement | null>(null)
  const populars = usePopularCompetitions()
  const { filter, type, selected } = useFilter(params, populars)
  const lastMatchday = useRef('')
  const lastMatchdate = useRef('')
  const { matches, IdCompetition } = useCalendarData(type, selected)
  const size = 200
  useEffect(() => {
    lastMatchday.current = ''
    lastMatchdate.current = ''
  })
  useScrollLoader(topSpinnerRef, bottomSpinnerRef, matches[IdCompetition], setMatches, size, 1)
  return (
    <>
      <Filters path="calendar" filter={filter} type={type} selected={selected} term={term} search={search} />
      <nav className="h-8 overflow-x-scroll bg-indigo-600 contain-auto-x scrollbar">
        <ul className="flex flex-wrap justify-center px-2 text-indigo-100 w-max gap-x-4">
          <Competitions
            path="calendar"
            selected={selected}
            filter={filter}
            populars={populars}
            term={term}
            find={find}
          />
          {filter === VIEW.FAVORITES && <Teams path="calendar" selected={selected} term={term} find={find} />}
        </ul>
      </nav>
      <div className="relative flex flex-col items-center pb-3 contain-auto-y">
        <div
          ref={topSpinnerRef}
          className="absolute top-0 hidden w-4 h-4 border-t-2 border-b-2 border-indigo-700 rounded-full animate-spin"
        ></div>
        {visibleMatches.map((match) => {
          if (type === VIEW.TEAM && match.Home.IdTeam !== selected && match.Away.IdTeam !== selected) return null
          if (
            term &&
            !find(match.CompetitionName[0].Description) &&
            !find(match.Home.TeamName[0].Description) &&
            !find(match.Away.TeamName[0].Description)
          )
            return null
          return (
            <div className="w-full" key={match.IdMatch}>
              <MatchDayInfo MatchDay={match.MatchDay} lastMatchday={lastMatchday} />
              <MatchDateInfo MatchDate={match.Date} lastMatchdate={lastMatchdate} />
              <Match match={match} listView={true} />
            </div>
          )
        })}
        <div
          ref={bottomSpinnerRef}
          className="absolute hidden w-4 h-4 mb-2 border-t-2 border-b-2 border-indigo-700 rounded-full -bottom-1 animate-spin"
        ></div>
      </div>
    </>
  )
}

export default Calendar
