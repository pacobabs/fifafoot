import React, { useState } from 'react'
import { useMatchData } from '@services'
import Match from '@components/common/match'
import Lineups from '@components/common/lineups'
import Stats from '@components/common/stats'
import Timeline from '@components/common/timeline'
import Standings from '@components/common/standings'
import TeamGoals from '@components/common/goals'
import Bookings from '@components/common/bookings'
import Spinner from '@components/common/spinner'

type Props = {
  path?: string
  params?: string
}

const VIEW = {
  LINEUPS: 'LINEUPS',
  STATS: 'STATS',
  TIMELINE: 'TIMELINE',
  STANDINGS: 'STANDINGS'
}

const LiveMatch = ({ params = '' }: Props) => {
  const [idCompetition, idSeason, idStage, idMatch] = params.split('/')
  const { match, standings, events } = useMatchData(idCompetition, idSeason, idStage, idMatch)
  const [view, setView] = useState(VIEW.LINEUPS)
  if (!match || !idCompetition || !idSeason || !idStage || !idMatch) return <Spinner />
  const Home = match.Home || match.HomeTeam
  const Away = match.Away || match.AwayTeam
  const hasGoals = Home.Goals?.length > 0 || Away.Goals?.length > 0
  const hasBookings = Home.Bookings?.length > 0 || Away.Bookings?.length > 0
  return (
    <div className="bg-indigo-100">
      <Match match={match} />
      {hasGoals && <TeamGoals home={Home} away={Away} />}
      {hasBookings && <Bookings home={Home} away={Away} />}
      <nav>
        <ul className="flex justify-around bg-indigo-500 text-indigo-50">
          <li>
            <a onClick={() => setView(VIEW.TIMELINE)} className={view === VIEW.TIMELINE ? 'selected' : ''}>
              TIMELINE
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.LINEUPS)} className={view === VIEW.LINEUPS ? 'selected' : ''}>
              LINEUPS
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.STATS)} className={view === VIEW.STATS ? 'selected' : ''}>
              STATS
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.STANDINGS)} className={view === VIEW.STANDINGS ? 'selected' : ''}>
              STANDINGS
            </a>
          </li>
        </ul>
      </nav>
      <Lineups match={match} hidden={view !== VIEW.LINEUPS} />
      <Stats match={match} events={events} hidden={view !== VIEW.STATS} />
      <Timeline match={match} events={events} hidden={view !== VIEW.TIMELINE} />
      <Standings standings={standings} hidden={view !== VIEW.STANDINGS} />
      {match.Stadium.Name[0] && (
        <span className="block px-2 py-4 font-bold text-center text-indigo-900">
          Stadium {match.Stadium.Name[0].Description}
        </span>
      )}
    </div>
  )
}
export default LiveMatch
