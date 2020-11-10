import React from 'react'
import Lineup from '@components/common/lineup'
import { Match } from '@services/types'

type Props = {
  match: Match
  hidden: boolean
}

const Lineups = ({ match, hidden }: Props) => {
  const { MatchStatus, AwayTeam, HomeTeam } = match
  return (
    <div className={`match ${hidden ? 'hidden' : ''}`}>
      <div>
        {match.AwayTeam.Players.length && match.AwayTeam.Players.length ? (
          <>
            <div className="team">
              <Lineup team={HomeTeam} matchStatus={MatchStatus} />
            </div>
            <div className="team away">
              <Lineup team={AwayTeam} matchStatus={MatchStatus} />
            </div>
          </>
        ) : (
          <div className="info">No Line ups yet.</div>
        )}
      </div>
    </div>
  )
}
export default Lineups
