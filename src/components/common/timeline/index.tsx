import React from 'react'
import { isMatchplayed } from '@utils'
import TeamLogo from '@components/common/team-logo'
import { Match, MatchEvent } from '@services/types'

type Props = {
  match: Match
  events: MatchEvent[]
  hidden: boolean
}

const Timeline = ({ match, events, hidden }: Props) => {
  const { MatchStatus } = match
  if (!isMatchplayed(MatchStatus)) {
    return (
      <div className={`match ${hidden ? 'hidden' : ''}`}>
        <div className="info">No timeline yet.</div>
      </div>
    )
  }
  return (
    <div className={`match ${hidden ? 'hidden' : ''}`}>
      {events
        .filter(({ Type }) => Type !== 14)
        .map(({ EventId, IdTeam, MatchMinute, EventDescription }) => {
          if (!EventDescription[0]?.Description) return
          return (
            <div className="timeline" key={EventId}>
              <p>
                <span>
                  {MatchMinute}
                  {IdTeam ? <TeamLogo team={match.HomeTeam.IdTeam === IdTeam ? match.HomeTeam : match.AwayTeam} /> : ''}
                </span>
                <span>{EventDescription[0]?.Description}</span>
                <span>
                  {IdTeam ? <TeamLogo team={match.HomeTeam.IdTeam === IdTeam ? match.HomeTeam : match.AwayTeam} /> : ''}
                </span>
              </p>
            </div>
          )
        })}
    </div>
  )
}
export default Timeline
