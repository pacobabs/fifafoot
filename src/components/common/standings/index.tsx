import React, { Fragment } from 'react'
import Image from '@components/common/image'
import { Standing } from '@services/types'

type Props = {
  standings: Standing[]
  hidden: boolean
}

const Standings = ({ standings, hidden }: Props) => {
  if (standings.length === 0) {
    return (
      <div className={`${hidden ? 'invisible' : 'visible'}`}>
        <div className="">Standings are not available.</div>
      </div>
    )
  }
  return (
    <div className={`px-2 bg-indigo-100 ${hidden ? 'invisible' : 'visible'}`}>
      <p className="flex mt-2.5">
        <span className="w-4"></span>
        <span className="flex-grow pl-1">Club</span>
        <span className="w-4 text-right">MP</span>
        <span className="w-4 text-right">W</span>
        <span className="w-4 text-right">D</span>
        <span className="w-4 text-right">L</span>
        <span className="w-4 text-right">GF</span>
        <span className="w-4 text-right">GA</span>
        <span className="w-4 text-right">GD</span>
        <span className="w-4 text-right">Pts</span>
      </p>
      {standings.map(({ Position, Points, Played, Won, Drawn, Lost, For, Against, Team }) => (
        <Fragment key={Team.IdTeam}>
          <p className="flex">
            <span className="w-4">{Position}</span>
            <span className="flex flex-grow gap-2">
              <div className="relative w-6 h-6">
                <Image
                  className="absolute object-contain -mt-1"
                  src={`https://api.fifa.com/api/v1/picture/teams-sq-3/${Team.IdTeam}`}
                  fallbackSrc="/images/football-club.svg"
                />
              </div>
              {Team.Name[0].Description}
            </span>
            <span className="w-4 text-right">{Played}</span>
            <span className="w-4 text-right">{Won}</span>
            <span className="w-4 text-right">{Drawn}</span>
            <span className="w-4 text-right">{Lost}</span>
            <span className="w-4 text-right">{For}</span>
            <span className="w-4 text-right">{Against}</span>
            <span className="w-4 text-right">{For - Against}</span>
            <span className="w-4 text-right">{Points}</span>
          </p>
        </Fragment>
      ))}
    </div>
  )
}
export default Standings
