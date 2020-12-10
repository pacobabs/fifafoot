import React from 'react'
import Lineup from './lineup'
import { Match } from '@services/types'
import ballImg from '@assets/images/soccer-ball.svg'

type Props = {
  match: Match
  hidden: boolean
}

const Lineups = ({ match, hidden }: Props) => {
  const { MatchStatus, AwayTeam, HomeTeam } = match
  return (
    <div className={`px-2 ${hidden ? 'hidden' : ''}`}>
      {match.AwayTeam.Players.length && match.AwayTeam.Players.length ? (
        <div className="flex">
          <Lineup team={HomeTeam} matchStatus={MatchStatus} />
          <Lineup team={AwayTeam} away={true} matchStatus={MatchStatus} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 md:h-64 gap-1">
          <img src={ballImg} alt="ball" className="w-4 h-4 -mt-0.5 opacity-70 grayscale" />
          <span>Lineups are not available.</span>
        </div>
      )}
    </div>
  )
}
export default Lineups
