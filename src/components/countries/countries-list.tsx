import React from 'react'
import { useCountries } from '@store/selectors'
import { addCountry, removeCountry } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'
import fallbackGlobeImg from '@assets/images/globe.svg'

type Props = {
  term: string
  find: (term: string) => boolean
  favorites?: boolean
}

const CountriesList = ({ term, find, favorites = false }: Props) => {
  const { countries, myCountries } = useCountries()
  return (
    <>
      {countries.map(({ IdCountry, Name }) => {
        if (term.length >= 3 && !find(Name)) return null
        if (favorites && term.length < 3 && !myCountries.includes(IdCountry)) return null
        return (
          <div key={IdCountry} className="flex flex-col items-center">
            <Star list={myCountries} id={IdCountry} addAction={addCountry} removeAction={removeCountry} />
            <div className="relative w-8 h-8">
              <Image
                className="object-contain w-8 h-8"
                src={`https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`}
                alt={Name}
                fallbackSrc={fallbackGlobeImg}
              />
            </div>
            <span className="block text-center text-indigo-600 min-w-max font-inter">{Name}</span>
          </div>
        )
      })}
    </>
  )
}
export default CountriesList
