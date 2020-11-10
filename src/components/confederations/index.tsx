import React, { useState } from 'react'
import { useSearch } from '@services'
import { useConfederations } from '@store/selectors'
import { addConfederation, removeConfederation } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}

const Confederations = () => {
  console.count('Confederations')
  const { confederations, myConfederations } = useConfederations()
  const [view, setView] = useState(VIEW.ALL)
  const { term, search, find } = useSearch()
  return (
    <>
      <nav>
        <ul>
          <li>
            <a onClick={() => setView(VIEW.FAVORITES)} className={view === VIEW.FAVORITES ? 'selected' : ''}>
              FAVORITE ({myConfederations.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL CONFEDERATIONS
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => search(e.target.value)} type="search" />
      <section>
        {view === VIEW.FAVORITES && !myConfederations.length && !term ? (
          <div>Choose your favorite confederation in the all confederations section or search for one.</div>
        ) : (
          confederations.map(({ IdConfederation, Name }) => {
            if (view === VIEW.FAVORITES && !myConfederations.includes(IdConfederation) && !term) return null
            if (term && !find(Name[0].Description) && !find(IdConfederation)) return null
            return (
              <div key={IdConfederation} className="card">
                <h1 title={Name[0].Description}>{IdConfederation}</h1>
                <Image
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/confederations-sq-2/${IdConfederation}`}
                  fallbackSrc="/images/shield.svg"
                />
                <Star
                  list={myConfederations}
                  id={IdConfederation}
                  addAction={addConfederation}
                  removeAction={removeConfederation}
                />
              </div>
            )
          })
        )}
      </section>
    </>
  )
}
export default Confederations
