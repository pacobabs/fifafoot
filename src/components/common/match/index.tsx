import React from 'react'
import {
  isMatchPollable,
  getRelativeTime,
  getLocaleMatchTime,
  getLocaleMatchDayTime,
  getMatchStatus,
  getLocaleMatchDay
} from '@utils'
import { useLiveMatchData } from '@services'
import LiveTeam from '@components/common/team'
import { Match } from '@services/types'
import { Link } from 'gatsby'

type Props = {
  match: Match
  listView?: boolean
  hidden?: boolean
}

const LiveMatch = ({ match, listView = false, hidden = false }: Props) => {
  const liveMatch = useLiveMatchData(match)
  if (hidden) return null
  const {
    IdMatch,
    Date: MatchDate,
    MatchTime,
    MatchStatus,
    Period,
    TimeDefined,
    FirstHalfExtraTime,
    SecondHalfExtraTime
  } = liveMatch
  const { time } = getRelativeTime(MatchDate)
  const extraTime =
    Period === 3
      ? FirstHalfExtraTime
        ? `(+${FirstHalfExtraTime})`
        : ''
      : SecondHalfExtraTime
      ? `(+${SecondHalfExtraTime})`
      : ''
  const showScore = MatchStatus === 0 || MatchStatus === 3
  const matchTime =
    time <= 0 && TimeDefined && Period !== 10 && Period !== 4
      ? MatchTime && isMatchPollable(MatchStatus)
        ? MatchTime + extraTime
        : null
      : null
  const halfTime = MatchStatus === 3 && Period === 4 ? 'HALF TIME' : null
  const Home = liveMatch.Home || liveMatch.HomeTeam
  const Away = liveMatch.Away || liveMatch.AwayTeam
  return (
    <Link
      key={IdMatch}
      className={`flex flex-col mb-0.5 ${listView ? 'h-16' : ''}`}
      to={`/live/${match.IdCompetition}/${match.IdSeason}/${match.IdStage}/${match.IdMatch}`}
    >
      <div className={`flex gap-0.5 px-1 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 justify-between`}>
        <span className="px-1 text-gray-800 bg-gray-100 rounded-xl">
          {TimeDefined
            ? listView
              ? getLocaleMatchTime(MatchDate)
              : getLocaleMatchDayTime(MatchDate)
            : getLocaleMatchDay(MatchDate)}
        </span>
        <span className={`flex ${matchTime ? 'text-pink-700 font-bold' : 'text-gray-500 px-1 bg-gray-100 rounded-xl'}`}>
          {halfTime || matchTime || getMatchStatus(MatchStatus, MatchDate, TimeDefined)}
          {MatchStatus === 3 && !halfTime && (
            <div className="relative inline-block mt-0.5 mr-2 livenow">
              <div className="absolute w-3 h-3 border-4 rounded-full"></div>
              <div className="absolute w-3 h-3 border-4 rounded-full"></div>
              <div className="absolute w-3 h-3 border-4 rounded-full"></div>
              <div className="absolute w-3 h-3 border-4 rounded-full"></div>
            </div>
          )}
        </span>
      </div>

      <div className={`flex px-1 bg-gray-50 ${listView ? 'py-2 sm:pt-2 sm:pb-0' : 'py-4'}`}>
        <LiveTeam team={Home} opponent={Away} atHome={true} showScore={showScore} listView={listView} />
        <span
          className={`border-b-4 border-t-2 font-black font-recursive h-6 mt-1.5 px-2 text-sm md:text-lg text-gray-300 pt-0.5 border-gray-100 bg-gray-100`}
        >
          -
        </span>
        <LiveTeam team={Away} opponent={Home} atHome={false} showScore={showScore} listView={listView} />
      </div>
    </Link>
  )
}
export default LiveMatch
