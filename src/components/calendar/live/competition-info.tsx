import React, { MutableRefObject } from 'react'
import Image from '@components/common/image'
import fallbackImg from '@assets/images/football-club.svg'

type Props = {
  idCompetition: string
  competition: string
  lastCompetition: MutableRefObject<string>
}

const MatchDateInfo = ({ idCompetition, competition, lastCompetition }: Props) => {
  if (idCompetition === lastCompetition.current) return null
  lastCompetition.current = idCompetition
  return (
    <div className="flex justify-center items-center px-1 py-0.5 font-bold uppercase font-recursive bg-gradient-to-r from-indigo-600 via-indigo-300 to-indigo-600 text-indigo-50 text-center relative">
      <div className="w-6 h-4 pl-2 bg-indigo-50 rounded-l-3xl">
        <Image
          className="inline-block object-contain w-4 h-4 pb-0.5"
          src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${idCompetition}`}
          fallbackSrc={fallbackImg}
        />
      </div>
      <span className="px-2 text-black bg-white">{competition}</span>
      <div className="w-6 h-4 pr-2 bg-indigo-50 rounded-r-3xl">
        <Image
          className="inline-block object-contain w-4 h-4 pb-0.5"
          src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${idCompetition}`}
          fallbackSrc={fallbackImg}
        />
      </div>
    </div>
  )
}

export default MatchDateInfo
