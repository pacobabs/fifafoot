import React from 'react'
import Lineup from './lineup'
import { Match } from '@services/types'

type Props = {
  match: Match
  hidden: boolean
}

const Lineups = ({ match, hidden }: Props) => {
  const { MatchStatus, AwayTeam, HomeTeam } = match
  return (
    <div className={`px-2 ${hidden ? 'invisible' : 'visible'}`}>
      {match.AwayTeam.Players.length && match.AwayTeam.Players.length ? (
        <div className="flex">
          <Lineup team={HomeTeam} matchStatus={MatchStatus} />
          <Lineup team={AwayTeam} away={true} matchStatus={MatchStatus} />
        </div>
      ) : (
        <div className="">No Line ups yet.</div>
      )}
    </div>
  )
}
export default Lineups
