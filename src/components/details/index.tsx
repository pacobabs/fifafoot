import React, { useState } from 'react'
import { useMatchData } from '@services'
import Match from '@components/common/match'
import Lineups from '@components/common/lineups'
import Stats from '@components/common/stats'
import Timeline from '@components/common/timeline'
import Standings from '@components/common/standings'

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
  const [view, setView] = useState(VIEW.LINEUPS)
  const [idCompetition, idSeason, idStage, idMatch] = params.split('/')
  const { match, standings, events } = useMatchData(idCompetition, idSeason, idStage, idMatch)
  if (!idCompetition || !idSeason || !idStage || !idMatch) return <div className="live">No Match Found</div>
  return (
    <div className="live">
      {match ? (
        <>
          <Match match={match} />
          <section className="details">
            <div className="match">
              <nav>
                <ul>
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
            </div>
          </section>
          <section className="details">
            <Lineups match={match} hidden={view !== VIEW.LINEUPS} />
            <Stats match={match} events={events} hidden={view !== VIEW.STATS} />
            <Timeline match={match} events={events} hidden={view !== VIEW.TIMELINE} />
            <Standings standings={standings} hidden={view !== VIEW.STANDINGS} />
          </section>
          <section className="stadium">
            <div>
              <p>
                <b>Stadium</b>
              </p>
              <p>{match.Stadium.Name[0].Description}</p>
            </div>
          </section>
        </>
      ) : (
        <div>loading</div>
      )}
    </div>
  )
}
export default LiveMatch
