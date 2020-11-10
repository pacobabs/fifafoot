import React from 'react'
import { isMatchplayed, getMatchStats } from '@utils'
import { Match, MatchEvent } from '@services/types'
import TeamLogo from '@components/common/team-logo'

type Props = {
  match: Match
  events: MatchEvent[]
  hidden: boolean
}

const Stats = ({ match, events, hidden }: Props) => {
  const {
    MatchStatus,
    AwayTeam: { IdTeam: IdAway },
    HomeTeam: { IdTeam: IdHome }
  } = match
  if (!isMatchplayed(MatchStatus)) {
    return (
      <div className={`match ${hidden ? 'hidden' : ''}`}>
        <div className="info">No Stats yet.</div>
      </div>
    )
  }
  const stats = getMatchStats(match, events)
  return (
    <div className={`match ${hidden ? 'hidden' : ''}`}>
      <div>
        <p>TEAM STATS</p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].shots}</span>
          <span>Total shots</span>
          <span>{stats[IdAway].shots}</span>
        </p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].blockedShots}</span>
          <span>Blocked shots</span>
          <span>{stats[IdAway].blockedShots}</span>
        </p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].possession}%</span>
          <span>Possession</span>
          <span>{stats[IdAway].possession}%</span>
        </p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].fouls}</span>
          <span>Fouls</span>
          <span>{stats[IdAway].fouls}</span>
        </p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].yellowCards}</span>
          <span>Yellow cards</span>
          <span>{stats[IdAway].yellowCards}</span>
        </p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].redCards}</span>
          <span>Red cards</span>
          <span>{stats[IdAway].redCards}</span>
        </p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].offsides}</span>
          <span>Offsides</span>
          <span>{stats[IdAway].offsides}</span>
        </p>
      </div>
      <div className="stats">
        <p>
          <span>{stats[IdHome].corners}</span>
          <span>Corners</span>
          <span>{stats[IdAway].corners}</span>
        </p>
      </div>
    </div>
  )
}
export default Stats
