import React, { useState, useRef, Fragment } from 'react'
import { useCurrentSeasonInfo, useCalendarCompetitionData } from '@services'
import { useCompetitions, useMatches, useTeams } from '@store/selectors'
import CalendarMatch from '@components/common/match'
import MatchDateInfo from './matchdate-info'
import MatchDayInfo from './matchday-info'
import { Link } from 'gatsby'

const VIEW = {
  TEAM: 'TEAM',
  COMPETITION: 'COMPETITION'
}

const Calendar = () => {
  console.count('Calendar')
  const { competitions, myCompetitions } = useCompetitions()
  const { teams, myTeams } = useTeams()
  const defaultId = myTeams[0] || myCompetitions[0] || ''
  const defaultView = myTeams[0] ? VIEW.TEAM : myCompetitions[0] ? VIEW.COMPETITION : ''
  const [state, setState] = useState({ view: defaultView, id: defaultId })
  const { IdCompetition = '', IdSeason = '' } = useCurrentSeasonInfo(state.view, state.id)
  const { matches } = useMatches()
  const loaded = matches[IdCompetition] !== undefined
  const lastMatchday = useRef('')
  const lastMatchdate = useRef('')
  useCalendarCompetitionData(loaded, IdCompetition, IdSeason)
  return (
    <div className="live">
      <nav>
        <ul>
          {teams.map(({ IdTeam, TeamName }) => {
            if (!myTeams.includes(IdTeam)) return null
            return (
              <li key={IdTeam}>
                <a
                  onClick={() => {
                    setState({ id: IdTeam, view: VIEW.TEAM })
                  }}
                  className={state.view === VIEW.TEAM && state.id === IdTeam ? 'selected' : ''}
                >
                  {TeamName[0].Description}
                </a>
              </li>
            )
          })}
          {competitions.map(({ IdCompetition, Name }) => {
            if (!myCompetitions.includes(IdCompetition)) return null
            return (
              <li key={IdCompetition}>
                <a
                  onClick={() => {
                    setState({ id: IdCompetition, view: VIEW.COMPETITION })
                  }}
                  className={state.view === VIEW.COMPETITION && state.id === IdCompetition ? 'selected' : ''}
                >
                  {Name[0].Description}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
      {state.id === '' ? (
        <section>
          <div>Choose your favorites to view the calendar</div>
        </section>
      ) : (
        matches[IdCompetition]?.map((match) => {
          if (state.view === VIEW.TEAM && match.Home.IdTeam !== state.id && match.Away.IdTeam !== state.id) return null
          return (
            <Fragment key={match.IdMatch}>
              <MatchDayInfo MatchDay={match.MatchDay} lastMatchday={lastMatchday} />
              <MatchDateInfo MatchDate={match.Date} lastMatchdate={lastMatchdate} />
              <CalendarMatch match={match} />
            </Fragment>
          )
        })
      )}
    </div>
  )
}
export default Calendar
