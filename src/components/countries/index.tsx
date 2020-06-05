import React, { useState, useCallback, ChangeEvent } from 'react'
import debounce from 'lodash/debounce'
import { normalize } from '@utils'
import { useCountries } from '@store/selectors'
import { addCountry, removeCountry } from '@store/actions'
import Star from '@components/common/star'
import countryImg from '@assets/images/globe.svg'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}
const Countries = () => {
  console.count('Countries')
  const { countries, myCountries } = useCountries()
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
              FAVORITE COUNTRIES ({myCountries.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL COUNTRIES
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => debounceSearch(e.target.value)} type="search" />
      <section>
        {view === VIEW.FAVORITES && !myCountries.length && !search ? (
          <div>Choose your favorite country in the all countries section or search for one.</div>
        ) : (
          countries.map(({ IdCountry, Name }) => {
            if (view === VIEW.FAVORITES && !myCountries.includes(IdCountry) && !search) return null
            if (search && !normalize(Name).includes(normalize(search))) return null
            return (
              <div key={IdCountry} className="card">
                <h1>{Name}</h1>
                <img
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`}
                  loading="lazy"
                  onError={(e: ChangeEvent<HTMLImageElement>) => {
                    e.target.src = countryImg
                  }}
                />
                <Star list={myCountries} id={IdCountry} addAction={addCountry} removeAction={removeCountry} />
              </div>
            )
          })
        )}
      </section>
    </>
  )
}
export default Countries
