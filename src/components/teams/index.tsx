import React, { useState, useCallback, ChangeEvent } from 'react'
import debounce from 'lodash/debounce'
import { normalize } from '@utils'
import { useTeams } from '@store/selectors'
import { addTeam, removeTeam } from '@store/actions'
import Countries from '@components/countries'
import Confederations from '@components/confederations'
import Competitions from '@components/competitions'
import Star from '@components/common/star'
import clubImg from '@assets/images/football-club.svg'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}

const Teams = () => {
  console.count('TEAMS')
  const { teams, myTeams } = useTeams()
  const [view, setView] = useState(VIEW.ALL)
  const [search, setSearch] = useState('')
  const onChange = (term: string) => setSearch(term)
  const debounceSearch = useCallback(debounce(onChange, 133.3333333), [])
  return (
    <div className="teams">
      <Confederations />
      <Countries />
      <Competitions />
      <nav>
        <ul>
          <li>
            <a onClick={() => setView(VIEW.FAVORITES)} className={view === VIEW.FAVORITES ? 'selected' : ''}>
              FAVORITE TEAMS ({myTeams.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL TEAMS
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => debounceSearch(e.target.value)} type="search" />
      <section>
        {view === VIEW.FAVORITES && !myTeams.length && !search ? (
          <div>Choose your favorite team in the all teams section or search for one.</div>
        ) : (
          teams.map(({ IdTeam, TeamName }) => {
            if (view === VIEW.FAVORITES && !myTeams.includes(IdTeam) && !search) return null
            if (search && !normalize(TeamName[0].Description).includes(normalize(search))) return null
            return (
              <div key={IdTeam} className="card">
                <h1>{TeamName[0].Description}</h1>
                <img
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/teams-sq-3/${IdTeam}`}
                  // loading="lazy"
                  onError={(e: ChangeEvent<HTMLImageElement>) => {
                    e.target.src = clubImg
                  }}
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
