import React from 'react'
import { useCompetitions } from '@store/selectors'
import { usePopularCompetitions } from '@services'
import Image from '@components/common/image'
import { Link } from 'gatsby'
import fallbackImg from '@assets/images/trophy.svg'

const Sidebar = () => {
  const { competitions } = useCompetitions()
  const populars = usePopularCompetitions()
  return (
    <div className="sm:col-start-1 sm:col-span-3 md:col-span-2 sm:row-start-3 md:row-start-2 md:row-end-4">
      <div className="text-indigo-50 text-center font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 pb-0.5 font-recursive font-cursive font-casual font-slant-1">
        TOP TOURNAMENTS
      </div>
      <ul className="flex flex-col bg-indigo-100 pb-0.5 ">
        {populars.map(({ IdCompetition, Name }) => (
          <li className="bg-gray-50" key={IdCompetition}>
            <Link
              to={`/calendar/POPULAR/COMPETITION/${IdCompetition}`}
              className="flex gap-1 px-1 text-indigo-500 ring-1 ring-inset ring-gray-200"
            >
              <div className="relative w-4 h-4">
                <Image
                  className="inline-block w-4 h-4 py-0.5 object-contain"
                  src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${IdCompetition}`}
                  alt={Name[0].Description}
                  fallbackSrc={fallbackImg}
                />
              </div>
              {Name[0].Description}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden sm:block text-indigo-50 text-center font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 pb-0.5 font-recursive font-cursive font-casual font-slant-1">
        ALL TOURNAMENTS
      </div>
      <ul className="hidden sm:flex flex-col bg-indigo-100 pb-0.5 ">
        {competitions.slice(0, 23).map(({ IdCompetition, Name }) => (
          <Link
            to={`/calendar/ALL/COMPETITION/${IdCompetition}`}
            className="flex gap-1 px-1 text-indigo-500 ring-1 ring-inset ring-gray-200 bg-gray-50"
            key={IdCompetition}
          >
            <div className="relative w-4 h-4">
              <Image
                className="inline-block w-4 h-4 py-0.5 object-contain"
                src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${IdCompetition}`}
                alt={Name[0].Description}
                fallbackSrc={fallbackImg}
              />
            </div>
            {Name[0].Description}
          </Link>
        ))}
      </ul>
    </div>
  )
}
export default Sidebar
