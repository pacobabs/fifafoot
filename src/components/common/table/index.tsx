import React from 'react'
import { useCountries } from '@store/selectors'
import { usePopularCompetitions } from '@services'
import Image from '@components/common/image'
import { Link } from 'gatsby'

const Table = () => {
  const populars = usePopularCompetitions()
  const { countries } = useCountries()
  return (
    <div className="sm:col-start-1 sm:col-span-2 md:col-start-11 md:col-span-2 md:row-start-2 md:row-end-4">
      <div className="text-indigo-50 text-center font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 pb-0.5 font-recursive">
        TOP TEAMS
      </div>
      <ul className="flex flex-col bg-indigo-100 pb-0.5 ">
        {populars.map(({ IdCompetition, Name }) => (
          <li className="bg-gray-50" key={IdCompetition}>
            <Link to={`/calendar/POPULAR/COMPETITION/${IdCompetition}`} className="flex gap-1 px-1 border-b-2">
              <div className="relative w-4 h-4">
                <Image
                  className="inline-block w-4 h-4 py-0.5 object-contain"
                  src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${IdCompetition}`}
                  fallbackSrc="/images/shield.svg"
                />
              </div>
              {Name[0].Description}
            </Link>
          </li>
        ))}
      </ul>
      <div className="text-indigo-50 text-center font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 pb-0.5 font-recursive">
        ALL COUNTRIES
      </div>
      <ul className="flex flex-col bg-indigo-100 pb-0.5 ">
        {countries.slice(0, 27).map(({ IdCountry, Name }) => (
          <Link to="/teams" className="flex gap-1 px-1 border-b-2 bg-gray-50" key={IdCountry}>
            <div className="relative w-4 h-4">
              <Image
                className="inline-block w-4 h-4 py-0.5 object-contain"
                src={`https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`}
                fallbackSrc="/images/globe.svg"
              />
            </div>
            {Name}
          </Link>
        ))}
      </ul>
    </div>
  )
}
export default Table
