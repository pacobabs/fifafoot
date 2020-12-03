import React, { MutableRefObject } from 'react'
import Image from '@components/common/image'

type Props = {
  idCompetition: string
  competition: string
  lastCompetition: MutableRefObject<string>
}

const MatchDateInfo = ({ idCompetition, competition, lastCompetition }: Props) => {
  if (idCompetition === lastCompetition.current) return null
  lastCompetition.current = idCompetition
  return (
    <div className="px-1 py-0.5 font-bold uppercase font-recursive bg-gradient-to-r from-indigo-600 via-indigo-300 to-indigo-600 text-indigo-50 text-center relative">
      <div className="absolute w-4 h-4 left-2 top-0.5 bg-indigo-50">
        <Image
          className="inline-block object-contain w-4 h-4 pb-0.5"
          src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${idCompetition}`}
          fallbackSrc="/images/football-club.svg"
        />
      </div>
      {competition}
      <div className="absolute w-4 h-4 top-0.5 right-2 bg-indigo-50">
        <Image
          className="inline-block object-contain w-4 h-4 pb-0.5"
          src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${idCompetition}`}
          fallbackSrc="/images/football-club.svg"
        />
      </div>
    </div>
  )
}

export default MatchDateInfo
