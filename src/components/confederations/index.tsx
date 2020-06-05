import React, { useState, useCallback, ChangeEvent } from 'react'
import debounce from 'lodash/debounce'
import { normalize } from '@utils'
import { useConfederations } from '@store/selectors'
import { addConfederation, removeConfederation } from '@store/actions'
import Star from '@components/common/star'
import confederationImg from '@assets/images/shield.svg'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}

const Confederations = () => {
  console.count('Confederations')
  const { confederations, myConfederations } = useConfederations()
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
              FAVORITE CONFEDERATIONS ({myConfederations.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL CONFEDERATIONS
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => debounceSearch(e.target.value)} type="search" />
      <section>
        {view === VIEW.FAVORITES && !myConfederations.length && !search ? (
          <div>Choose your favorite confederation in the all confederations section or search for one.</div>
        ) : (
          confederations.map(({ IdConfederation, Name }) => {
            if (view === VIEW.FAVORITES && !myConfederations.includes(IdConfederation) && !search) return null
            if (
              search &&
              !normalize(Name[0].Description).includes(normalize(search)) &&
              !normalize(IdConfederation).includes(normalize(search))
            )
              return null
            return (
              <div key={IdConfederation} className="card">
                <h1 title={Name[0].Description}>{IdConfederation}</h1>
                <img
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/confederations-sq-2/${IdConfederation}`}
                  loading="lazy"
                  onError={(e: ChangeEvent<HTMLImageElement>) => {
                    e.target.src = confederationImg
                  }}
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
