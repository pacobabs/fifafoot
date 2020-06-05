import React, { useState } from 'react'
import { isMatchCancelled } from '@utils'
import { useLiveMatchesData } from '@services'
import { useMatches, useTeams } from '@store/selectors'
import LiveMatch from '@components/common/match'

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
      {matches['live']?.map((match) => {
        const {
          IdMatch,
          MatchStatus,
          TimeDefined,
          HomeTeam: { IdTeam: IdTeamHome },
          AwayTeam: { IdTeam: IdTeamAway }
        } = match
        if (!TimeDefined || !isMatchCancelled(MatchStatus)) return
        if (view === VIEW.TEAM && IdTeamFilter && IdTeamHome !== IdTeamFilter && IdTeamAway !== IdTeamFilter)
          return null
        return <LiveMatch key={IdMatch} match={match} />
      })}
    </div>
  )
}
export default Live
