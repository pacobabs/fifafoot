import React from 'react'
import { getLocaleMatchDayTime, getMatchStatus, getLocaleMatchDay } from '@utils'
import { useLiveMatchData } from '@services'
import LiveTeam from '@components/common/team'
import { Match } from '@services/types'
import { Link } from 'gatsby'

type Props = {
  match: Match
}

const LiveMatch = ({ match }: Props) => {
  console.count('MATCH')
  console.log(match.IdMatch)
  const liveMatch = useLiveMatchData(match)
  const { IdMatch, CompetitionName, Date: MatchDate, MatchTime, MatchStatus, Period, TimeDefined } = liveMatch
  const showScore = MatchStatus === 0 || MatchStatus === 3
  const matchTime = TimeDefined && Period !== 10 ? MatchTime : null
  const halfTime = MatchStatus === 3 && Period === 4 ? 'HALF TIME' : null
  const Home = liveMatch.Home || liveMatch.HomeTeam
  const Away = liveMatch.Away || liveMatch.AwayTeam
  return (
    <section key={IdMatch}>
      <div className="match">
        <Link
          to={`/live/${match.IdCompetition}/${match.IdSeason}/${match.IdStage}/${match.IdMatch}`}
          // onClick={(e) => e.preventDefault()}
        >
          <span className="competition">
            {CompetitionName[0].Description} /{' '}
            {TimeDefined ? getLocaleMatchDayTime(MatchDate) : getLocaleMatchDay(MatchDate)}
          </span>
          <span className="time">{halfTime || matchTime || getMatchStatus(MatchStatus, MatchDate, TimeDefined)}</span>
          <LiveTeam team={Home} opponent={Away} atHome={true} showScore={showScore} />
          <LiveTeam team={Away} opponent={Home} atHome={false} showScore={showScore} />
        </Link>
      </div>
    </section>
  )
}
export default LiveMatch
