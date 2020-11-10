import React, { useState } from 'react'
import { useSearch } from '@services'
import { useCountries } from '@store/selectors'
import { addCountry, removeCountry } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'

const VIEW = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES'
}
const Countries = () => {
  console.count('Countries')
  const { countries, myCountries } = useCountries()
  const [view, setView] = useState(VIEW.ALL)
  const { term, search, find } = useSearch()
  return (
    <>
      <nav>
        <ul>
          <li>
            <a onClick={() => setView(VIEW.FAVORITES)} className={view === VIEW.FAVORITES ? 'selected' : ''}>
              FAVORITE ({myCountries.length})
            </a>
          </li>
          <li>
            <a onClick={() => setView(VIEW.ALL)} className={view === VIEW.ALL ? 'selected' : ''}>
              ALL COUNTRIES
            </a>
          </li>
        </ul>
      </nav>
      <input placeholder="search..." onChange={(e) => search(e.target.value)} type="search" />
      <section className="scrollbar">
        {view === VIEW.FAVORITES && !myCountries.length && !term ? (
          <div>Choose your favorite country in the all countries section or search for one.</div>
        ) : (
          countries.map(({ IdCountry, Name }) => {
            if (view === VIEW.FAVORITES && !myCountries.includes(IdCountry) && !term) return null
            if (term && !find(Name)) return null
            return (
              <div key={IdCountry} className="card">
                <h1>{Name}</h1>
                <Image
                  className="logo"
                  src={`https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`}
                  fallbackSrc="/images/globe.svg"
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
