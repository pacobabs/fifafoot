import React from 'react'
import { TeamMatch } from '@services/types'
// import Bookings from '@components/common/bookings'
// import Substitutions from '@components/common/substitutions'
import Image from '@components/common/image'

type Props = {
  team: TeamMatch
  opponent: TeamMatch
  atHome: boolean
  showScore: boolean
  listView: boolean
}

const LiveTeam = ({ team, atHome, showScore, listView }: Props) => {
  if (!team) return null
  const { TeamName, Score } = team
  return (
    <div className={`flex flex-row w-1/2 ${atHome ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex items-center flex-grow h-full flex-col ${
          listView ? `sm:-mt-1 sm:gap-4 ${atHome ? 'sm:flex-row-reverse sm:pr-4' : 'sm:flex-row sm:pl-4'}` : ''
        }`}
      >
        <div className="relative w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8">
          <Image
            className="object-contain w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
            src={
              team.TeamType === 0
                ? `https://api.fifa.com/api/v1/picture/teams-sq-3/${team.IdTeam}`
                : `https://api.fifa.com/api/v1/picture/flags-sq-3/${team.IdCountry}`
            }
            fallbackSrc="/images/football-club.svg"
          />
        </div>
        <span
          className={`font-medium text-center ${listView ? `sm:h-4 ${atHome ? 'sm:text-right' : 'sm:text-left'}` : ''}`}
        >
          {TeamName?.[0]?.Description}
        </span>
      </div>
      <span
        className={`bg-gray-200 font-recursive h-6 inline-flex mt-1.5 text-lg w-6 ${
          atHome ? 'pl-3 pr-1text-right' : 'pr-3 pl-1'
        } ${showScore ? 'opacity-100' : 'opacity-0'}`}
      >
        {showScore ? Score : ''}
      </span>
    </div>
  )
}
export default LiveTeam
