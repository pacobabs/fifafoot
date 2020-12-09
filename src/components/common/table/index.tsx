import React from 'react'
import { useCountries } from '@store/selectors'
import { usePopularTeams } from '@services'
import Image from '@components/common/image'
import { Link } from 'gatsby'
import fallbackImg from '@assets/images/football-club.svg'
import fallbackGlobeImg from '@assets/images/globe.svg'

const Table = () => {
  const populars = usePopularTeams()
  const { countries } = useCountries()
  return (
    <div className="sm:hidden md:block md:col-start-11 md:col-span-2 md:row-start-2 md:row-end-4">
      <div className="text-indigo-50 text-center font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 pb-0.5 font-recursive font-cursive font-casual font-slant-1">
        TOP TEAMS
      </div>
      <ul className="flex flex-col bg-indigo-100 pb-0.5 ">
        {populars.map(({ IdTeam, IdCountry, TeamType, TeamName }) => (
          <li className="bg-gray-50" key={IdTeam}>
            <Link
              to={`/calendar/POPULAR/TEAM/${IdTeam}`}
              className="flex gap-1 px-1 text-indigo-500 ring-1 ring-inset ring-gray-200"
            >
              <div className="relative w-4 h-4 -mt-0.5">
                <Image
                  className="inline-block w-4 h-4 py-0.5 object-contain"
                  src={
                    TeamType === 1
                      ? `https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`
                      : `https://api.fifa.com/api/v1/picture/teams-sq-3/${IdTeam}`
                  }
                  fallbackSrc={fallbackImg}
                />
              </div>
              {TeamName[0].Description}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:block text-indigo-50 text-center font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 pb-0.5 font-recursive font-cursive font-casual font-slant-1">
        ALL COUNTRIES
      </div>
      <ul className="hidden md:flex flex-col bg-indigo-100 pb-0.5 ">
        {countries.slice(0, 27).map(({ IdCountry, Name }) => (
          <Link
            to="/teams"
            className="flex gap-1 px-1 text-indigo-500 ring-1 ring-inset ring-gray-200 bg-gray-50"
            key={IdCountry}
          >
            <div className="relative w-4 h-4">
              <Image
                className="inline-block w-4 h-4 py-0.5 object-contain"
                src={`https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`}
                fallbackSrc={fallbackGlobeImg}
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
