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
      <div className={`${hidden ? 'hidden' : ''}`}>
        <div className="">No timeline yet.</div>
      </div>
    )
  }
  return (
    <div className={`mt-2.5 flex flex-col bg-indigo-50 ${hidden ? 'hidden' : ''}`}>
      {events
        .filter(({ Type }) => Type !== 14)
        .map(({ EventId, IdTeam, MatchMinute, EventDescription }) => {
          if (!EventDescription[0]?.Description) return
          return (
            <div className="flex justify-around h-8" key={EventId}>
              <span className="flex flex-col items-center w-10 bg-indigo-100">
                {MatchMinute}
                {IdTeam ? (
                  <TeamLogo
                    className="w-4 h-4 -mt-0.5"
                    team={match.HomeTeam.IdTeam === IdTeam ? match.HomeTeam : match.AwayTeam}
                  />
                ) : (
                  ''
                )}
              </span>
              <span className="flex-grow px-1 bg-white">{EventDescription[0]?.Description}</span>
              <span className="w-8 py-1 pl-2 bg-indigo-100">
                {IdTeam ? (
                  <TeamLogo
                    className="w-4 h-4"
                    team={match.HomeTeam.IdTeam === IdTeam ? match.HomeTeam : match.AwayTeam}
                  />
                ) : (
                  ''
                )}
              </span>
            </div>
          )
        })}
    </div>
  )
}
export default Timeline
