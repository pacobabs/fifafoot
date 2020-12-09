import React, { ReactNode } from 'react'
import { isMatchplayed, getMatchStats } from '@utils'
import { Match, MatchEvent } from '@services/types'
import TeamLogo from '@components/common/team-logo'
import ballImg from '@assets/images/soccer-ball.svg'

type Props = {
  match: Match
  events: MatchEvent[]
  hidden: boolean
}

type RowProps = {
  children: ReactNode
}

const Row = ({ children }: RowProps) => <p className="flex flex-row justify-between">{children}</p>

const Stats = ({ match, events, hidden }: Props) => {
  const {
    MatchStatus,
    AwayTeam,
    HomeTeam,
    AwayTeam: { IdTeam: IdAway },
    HomeTeam: { IdTeam: IdHome }
  } = match
  if (!isMatchplayed(MatchStatus)) {
    return (
      <div className={`${hidden ? 'hidden' : 'flex items-center justify-center h-64 gap-1'}`}>
        <img src={ballImg} alt="ball" className="w-4 h-4 -mt-0.5 opacity-70 grayscale" />
        <span>Stats are not available.</span>
      </div>
    )
  }
  const stats = getMatchStats(match, events)
  return (
    <div className={`flex flex-col mt-3 px-2 ${hidden ? 'hidden' : ''}`}>
      <Row>
        <TeamLogo team={HomeTeam} className="w-4 h-4 -ml-1 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
        <span />
        <TeamLogo team={AwayTeam} className="w-4 h-4 -mr-1 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
      </Row>
      <Row>
        <span>{stats[IdHome].shots}</span>
        <span>Total shots</span>
        <span>{stats[IdAway].shots}</span>
      </Row>
      <Row>
        <span>{stats[IdAway].blockedShots}</span>
        <span>Blocked attempts</span>
        <span>{stats[IdHome].blockedShots}</span>
      </Row>
      <Row>
        <span>{stats[IdHome].possession}%</span>
        <span>Possession</span>
        <span>{stats[IdAway].possession}%</span>
      </Row>
      <Row>
        <span>{stats[IdHome].fouls}</span>
        <span>Fouls</span>
        <span>{stats[IdAway].fouls}</span>
      </Row>
      <Row>
        <span>{stats[IdHome].yellowCards}</span>
        <span>Yellow cards</span>
        <span>{stats[IdAway].yellowCards}</span>
      </Row>
      <Row>
        <span>{stats[IdHome].redCards}</span>
        <span>Red cards</span>
        <span>{stats[IdAway].redCards}</span>
      </Row>
      <Row>
        <span>{stats[IdHome].offsides}</span>
        <span>Offsides</span>
        <span>{stats[IdAway].offsides}</span>
      </Row>
      <Row>
        <span>{stats[IdHome].corners}</span>
        <span>Corners</span>
        <span>{stats[IdAway].corners}</span>
      </Row>
    </div>
  )
}
export default Stats
