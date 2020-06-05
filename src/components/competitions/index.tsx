import React, { useState, useCallback, ChangeEvent } from 'react'
import debounce from 'lodash/debounce'
import { normalize } from '@utils'
import { useCompetitions } from '@store/selectors'
import { addCompetition, removeCompetition } from '@store/actions'
import Star from '@components/common/star'
import competitionImg from '@assets/images/shield.svg'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}

const Competitions = () => {
  console.count('Competitions')
  const { competitions, myCompetitions } = useCompetitions()
  const [view, setView] = useState(VIEW.ALL)
  const [search, setSearch] = useState('')
  const onChange = (term: string) => setSearch(term)
  const debounceSearch = useCallback(debounce(onChange, 133.3333333), [])
  return (
    <>
      <nav>
        <ul>
          <li>
            <a onClick={() => setView(VIEW.FAVORITES)} className={view === VIEW.FAVORITES ? 'selected' : ''}>
              FAVORITE COMPETITITONS ({myCompetitions.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL COMPETITITONS
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => debounceSearch(e.target.value)} type="search" />
      <section>
        {view === VIEW.FAVORITES && !myCompetitions.length && !search ? (
          <div>Choose your favorite competition in the all competitions section or search for one.</div>
        ) : (
          competitions.map(({ IdCompetition, IdMemberAssociation, Name }) => {
            if (view === VIEW.FAVORITES && !myCompetitions.includes(IdCompetition) && !search) return null
            if (search && !normalize(Name[0].Description).includes(normalize(search))) return null
            return (
              <div key={IdCompetition} className="card">
                <h1>
                  {IdMemberAssociation[0]} - {Name[0].Description}
                </h1>
                <img
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${IdCompetition}`}
                  loading="lazy"
                  onError={(e: ChangeEvent<HTMLImageElement>) => {
                    e.target.src = competitionImg
                  }}
                />
                <Star
                  list={myCompetitions}
                  id={IdCompetition}
                  addAction={addCompetition}
                  removeAction={removeCompetition}
                />
              </div>
            )
          })
        )}
      </section>
    </>
  )
}
export default Competitions
