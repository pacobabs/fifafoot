import React, { useState, useRef, Fragment } from 'react'
import { isMatchCancelled } from '@utils'
import { useSearch, useLiveMatchesData } from '@services'
import { useMatches, useTeams } from '@store/selectors'
import LiveMatch from '@components/common/match'
import CompetitionInfo from './competition-info'

const VIEW = {
  ALL: 'ALL',
  TEAM: 'TEAM'
}

const Live = () => {
  console.count('Live')
  const [view, setView] = useState(VIEW.ALL)
  const { matches } = useMatches()
  const { myTeams } = useTeams()
  const [IdTeamFilter, setIdTeamFilter] = useState('')
  const loaded = matches['live'] !== undefined
  const lastCompetition = useRef('')
  const { term, search, find } = useSearch()
  useLiveMatchesData(loaded)
  return (
    <div className="live">
      <nav>
        <ul>
          {matches['live']?.map((match) => {
            const {
              HomeTeam: { IdTeam: IdTeamHome, TeamName: HomeTeamName },
              AwayTeam: { IdTeam: IdTeamAway, TeamName: AwayTeamName }
            } = match
            const homeIsFavoriteTeam = myTeams.includes(IdTeamHome)
            const awayIsFavoriteTeam = myTeams.includes(IdTeamAway)
            if (!homeIsFavoriteTeam && !awayIsFavoriteTeam) return null
            const IdTeam = homeIsFavoriteTeam ? IdTeamHome : IdTeamAway
            const TeamName = homeIsFavoriteTeam ? HomeTeamName : AwayTeamName
            return (
              <li key={IdTeam}>
                <a
                  onClick={() => {
                    setView(VIEW.TEAM)
                    setIdTeamFilter(IdTeam)
                  }}
                  className={view === VIEW.TEAM && IdTeamFilter === IdTeam ? 'selected' : ''}
                >
                  {TeamName[0].Description}
                </a>
              </li>
            )
          })}
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL LIVE MATCHES
            </a>
          </li>
        </ul>
      </nav>
      <section>
        <input placeholder="search..." onChange={(e) => search(e.target.value)} type="search" />
      </section>
      {matches['live']?.map((match) => {
        const {
          IdMatch,
          CompetitionName,
          MatchStatus,
          TimeDefined,
          HomeTeam: { IdTeam: IdTeamHome, TeamName: HomeName },
          AwayTeam: { IdTeam: IdTeamAway, TeamName: AwayName }
        } = match
        if (!TimeDefined || !isMatchCancelled(MatchStatus)) return
        if (view === VIEW.TEAM && IdTeamFilter && IdTeamHome !== IdTeamFilter && IdTeamAway !== IdTeamFilter)
          return null
        if (
          term &&
          !find(CompetitionName[0].Description) &&
          !find(HomeName[0].Description) &&
          !find(AwayName[0].Description)
        )
          return null
        return (
          <Fragment key={IdMatch}>
            <CompetitionInfo competition={CompetitionName[0].Description} lastCompetition={lastCompetition} />
            <LiveMatch match={match} />
          </Fragment>
        )
      })}
    </div>
  )
}
export default Live
