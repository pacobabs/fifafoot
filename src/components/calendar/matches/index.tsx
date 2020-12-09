import React, { useEffect, useRef } from 'react'
import { useCalendarData, usePopularCompetitions, useFilter, VIEW, useSearch } from '@services'
import Match from '@components/common/match'
import Filters from '@components/common/filters'
import Competitions from './competitions-list'
import Teams from './teams-list'
import MatchDateInfo from './matchdate-info'
import MatchDayInfo from './matchday-info'
import Spinner from '@components/common/spinner'

type Props = {
  path: string
  params?: string
}

const Calendar = ({ params = '' }: Props) => {
  const { term, search, find } = useSearch()
  const populars = usePopularCompetitions()
  const { filter, type, selected } = useFilter(params, populars)
  const lastMatchday = useRef('')
  const lastMatchdate = useRef('')
  const { matches, IdCompetition } = useCalendarData(type, selected)
  useEffect(() => {
    lastMatchday.current = ''
    lastMatchdate.current = ''
  })
  const matchesList = matches[IdCompetition]
  return (
    <>
      <Filters path="calendar" filter={filter} type={type} selected={selected} term={term} search={search} />
      <nav className="h-8 overflow-x-scroll bg-indigo-600 max-w scrollbar">
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
      <div className="relative flex flex-col items-center pb-3 border-l border-r">
        {matchesList ? (
          matchesList.map((match) => {
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
          })
        ) : (
          <Spinner />
        )}
      </div>
    </>
  )
}

export default Calendar
