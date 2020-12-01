import React from 'react'
import { getLocaleMatchTime, getLocaleMatchDayTime, getMatchStatus, getLocaleMatchDay } from '@utils'
import { useLiveMatchData } from '@services'
import LiveTeam from '@components/common/team'
import { Match } from '@services/types'
import { Link } from 'gatsby'

type Props = {
  match: Match
  listView?: boolean
}

const LiveMatch = ({ match, listView = false }: Props) => {
  const liveMatch = useLiveMatchData(match)
  const { IdMatch, Date: MatchDate, MatchTime, MatchStatus, Period, TimeDefined } = liveMatch
  const showScore = MatchStatus === 0 || MatchStatus === 3
  const matchTime = TimeDefined && Period !== 10 ? MatchTime : null
  const halfTime = MatchStatus === 3 && Period === 4 ? 'HALF TIME' : null
  const Home = liveMatch.Home || liveMatch.HomeTeam
  const Away = liveMatch.Away || liveMatch.AwayTeam
  return (
    <Link
      key={IdMatch}
      className="flex flex-col mb-0.5"
      to={`/live/${match.IdCompetition}/${match.IdSeason}/${match.IdStage}/${match.IdMatch}`}
      // onClick={(e) => e.preventDefault()}
    >
      <div className={`flex gap-0.5 px-1 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 justify-between`}>
        <span className="px-1 text-gray-800 bg-gray-100 rounded-xl">
          {TimeDefined
            ? listView
              ? getLocaleMatchTime(MatchDate)
              : getLocaleMatchDayTime(MatchDate)
            : getLocaleMatchDay(MatchDate)}
        </span>
        <span className={`${matchTime ? 'text-pink-700 font-bold' : 'text-gray-500 px-1 bg-gray-100 rounded-xl'}`}>
          {halfTime || matchTime || getMatchStatus(MatchStatus, MatchDate, TimeDefined)}
        </span>
      </div>

      <div className={`flex px-1 bg-gray-50 ${listView ? 'py-2 sm:pt-2 sm:pb-0' : 'py-4'}`}>
        <LiveTeam team={Home} opponent={Away} atHome={true} showScore={showScore} listView={listView} />
        <span
          className={`border-b-4 border-t-2 font-black font-recursive h-6 mt-1.5 px-2 text-indigo-200 pt-0.5 border-gray-100 bg-gray-200`}
        >
          -
        </span>
        <LiveTeam team={Away} opponent={Home} atHome={false} showScore={showScore} listView={listView} />
      </div>
    </Link>
  )
}
export default LiveMatch
