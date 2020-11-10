import React, { useState } from 'react'
import { useSearch } from '@services'
import { useTeams } from '@store/selectors'
import { addTeam, removeTeam } from '@store/actions'
import Countries from '@components/countries'
import Confederations from '@components/confederations'
import Competitions from '@components/competitions'
import Star from '@components/common/star'
import Image from '@components/common/image'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}

const Teams = () => {
  console.count('TEAMS')
  const { teams, myTeams } = useTeams()
  const [view, setView] = useState(VIEW.FAVORITES)
  const { term, search, find } = useSearch()
  return (
    <div className="teams">
      <Confederations />
      <Countries />
      <Competitions />
      <nav>
        <ul>
          <li>
            <a onClick={() => setView(VIEW.FAVORITES)} className={view === VIEW.FAVORITES ? 'selected' : ''}>
              FAVORITE ({myTeams.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL TEAMS
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => search(e.target.value)} type="search" />
      <section>
        {view === VIEW.FAVORITES && !myTeams.length && !term ? (
          <div>Choose your favorite team in the all teams section or search for one.</div>
        ) : (
          teams.map(({ IdTeam, TeamName }) => {
            if (view === VIEW.FAVORITES && !myTeams.includes(IdTeam) && !term) return null
            if (term && !find(TeamName[0].Description)) return null
            return (
              <div key={IdTeam} className="card">
                <h1>{TeamName[0].Description}</h1>
                <Image
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/teams-sq-3/${IdTeam}`}
                  fallbackSrc="/images/football-club.svg"
                />
                <Star list={myTeams} id={IdTeam} addAction={addTeam} removeAction={removeTeam} />
              </div>
            )
          })
        )}
      </section>
    </div>
  )
}
export default Teams
