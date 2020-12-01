import React, { ReactNode } from 'react'
import { isMatchplayed, getMatchStats } from '@utils'
import { Match, MatchEvent } from '@services/types'

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
    AwayTeam: { IdTeam: IdAway },
    HomeTeam: { IdTeam: IdHome }
  } = match
  if (!isMatchplayed(MatchStatus)) {
    return (
      <div className={`${hidden ? 'invisible' : 'visible'}`}>
        <div className="">No Stats yet.</div>
      </div>
    )
  }
  const stats = getMatchStats(match, events)
  return (
    <div className={`flex flex-col mt-3 px-2 bg-indigo-100 ${hidden ? 'invisible' : 'visible'}`}>
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
