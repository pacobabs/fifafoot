import React, { useState } from 'react'
import { useSearch } from '@services'
import { useCompetitions } from '@store/selectors'
import { addCompetition, removeCompetition } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}

const Competitions = () => {
  console.count('Competitions')
  const { competitions, myCompetitions } = useCompetitions()
  const [view, setView] = useState(VIEW.ALL)
  const { term, search, find } = useSearch()
  return (
    <>
      <nav>
        <ul>
          <li>
            <a onClick={() => setView(VIEW.FAVORITES)} className={view === VIEW.FAVORITES ? 'selected' : ''}>
              FAVORITE ({myCompetitions.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL COMPETITITONS
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => search(e.target.value)} type="search" />
      <section>
        {view === VIEW.FAVORITES && !myCompetitions.length && !term ? (
          <div>Choose your favorite competition in the all competitions section or search for one.</div>
        ) : (
          competitions.map(({ IdCompetition, IdMemberAssociation, Name }) => {
            if (view === VIEW.FAVORITES && !myCompetitions.includes(IdCompetition) && !term) return null
            if (term && !find(Name[0].Description)) return null
            return (
              <div key={IdCompetition} className="card">
                <h1>
                  {IdMemberAssociation[0]} - {Name[0].Description}
                </h1>
                <Image
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${IdCompetition}`}
                  fallbackSrc="/images/shield.svg"
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
