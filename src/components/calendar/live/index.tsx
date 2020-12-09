import React, { useState, useRef, Fragment, useEffect } from 'react'
import { useSearch, useLiveMatchesData, usePopularCompetitions, useFilter, VIEW } from '@services'
import LiveMatch from '@components/common/match'
import CompetitionInfo from './competition-info'
import Filters from '@components/common/filters'
import Competitions from '@components/calendar/matches/competitions-list'
import Teams from '@components/calendar/matches/teams-list'
import Spinner from '@components/common/spinner'
import { setMatches } from '@store/actions'

type Props = {
  path?: string
  params?: string
}

const Live = ({ params = '' }: Props) => {
  console.count('Live')
  const [liveMatch, setLiveMatch] = useState(false)
  const populars = usePopularCompetitions()
  const { filter, type, selected } = useFilter(params, populars, true)
  const lastCompetition = useRef('')
  const currentDay = useRef(new Date().getDay())
  const { term, search, find } = useSearch()
  useEffect(() => {
    const today = new Date().getDay()
    if (currentDay.current !== today) {
      currentDay.current = today
    }
    lastCompetition.current = ''
  })
  const { matches } = useLiveMatchesData()
  const matcheslist = matches.live
  return (
    <>
      <Filters
        path="liveresults"
        filter={filter}
        type={type}
        selected={selected}
        term={term}
        search={search}
        live={true}
        liveMatch={liveMatch}
        setLiveMatch={setLiveMatch}
      />
      <nav className="h-8 overflow-x-scroll bg-indigo-600 max-w scrollbar">
        <ul className="flex flex-wrap justify-center px-2 text-indigo-100 w-max gap-x-4">
          <Competitions
            path="liveresults"
            selected={selected}
            filter={filter}
            populars={populars}
            live={true}
            term={term}
            find={find}
          />
          {filter === VIEW.FAVORITES && (
            <Teams path="liveresults" selected={selected} live={true} term={term} find={find} />
          )}
        </ul>
      </nav>
      <>
        {matcheslist ? (
          matcheslist
            .sort(
              (
                { Date: dateA, MatchStatus: MatchStatusA, IdCompetition: idCompetitionA },
                { Date: dateB, MatchStatus: MatchStatusB, IdCompetition: idCompetitionB }
              ) => {
                for (let i = 0; i < populars.length; i++) {
                  if (idCompetitionA !== idCompetitionB && populars[i].IdCompetition === idCompetitionA) return -1
                  if (idCompetitionA !== idCompetitionB && populars[i].IdCompetition === idCompetitionB) return 1
                }
                const status = MatchStatusA === 3 ? -1 : MatchStatusB === 3 ? 1 : 0
                return status || (new Date(dateA) < new Date(dateB) ? -1 : 1)
              }
            )
            .map((match) => {
              const {
                IdMatch,
                IdCompetition,
                CompetitionName,
                MatchStatus,
                TimeDefined,
                HomeTeam: { IdTeam: IdHome, TeamName: Home },
                AwayTeam: { IdTeam: IdAway, TeamName: Away }
              } = match
              if (liveMatch && MatchStatus !== 3) return null
              if (selected !== 'ALL' && IdCompetition !== selected && IdHome !== selected && IdAway !== selected)
                return null
              if (!TimeDefined) return null
              if (
                term &&
                !find(CompetitionName[0].Description) &&
                !find(Home[0].Description) &&
                !find(Away[0].Description)
              )
                return null
              return (
                <Fragment key={IdMatch}>
                  <CompetitionInfo
                    idCompetition={IdCompetition}
                    competition={CompetitionName[0].Description}
                    lastCompetition={lastCompetition}
                  />
                  <LiveMatch match={match} listView={true} />
                </Fragment>
              )
            })
        ) : (
          <Spinner />
        )}
      </>
    </>
  )
}
export default Live
