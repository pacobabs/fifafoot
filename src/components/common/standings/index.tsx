import React, { Fragment } from 'react'
import Image from '@components/common/image'
import { Standing } from '@services/types'
import ballImg from '@assets/images/soccer-ball.svg'
import fallbackImg from '@assets/images/football-club.svg'

type Props = {
  standings: Standing[]
  hidden: boolean
}

const Standings = ({ standings, hidden }: Props) => {
  const perGroupStandings = standings.reduce((groups, standing) => {
    const key = standing.Group.length ? standing.Group[0].Description : ''
    return {
      ...groups,
      [key]: groups[key] ? [...groups[key], standing] : [standing]
    }
  }, {} as Record<string, Standing[]>)
  if (standings.length === 0) {
    return (
      <div className={`${hidden ? 'hidden' : 'flex items-center justify-center h-32 md:h-64 gap-1'}`}>
        <img src={ballImg} alt="ball" className="w-4 h-4 -mt-0.5 opacity-70 grayscale" />
        <span>Standings are not available.</span>
      </div>
    )
  }
  return (
    <div className={`px-2 ${hidden ? 'hidden' : ''}`}>
      {Object.entries(perGroupStandings)
        .sort(([groupA], [groupB]) => {
          return groupA.localeCompare(groupB)
        })
        .map(([group, standings]) => {
          return (
            <Fragment key={group}>
              {group && <p className="text-lg ml-7 font-recursive">{group}</p>}
              <p className="flex gap-2 mt-2.5">
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
                  <p className="flex gap-2">
                    <span className="w-4">{Position}</span>
                    <span className="flex flex-grow gap-2">
                      <span className="relative w-6 h-6">
                        <Image
                          className="absolute object-contain -mt-1"
                          alt={Team.Name[0].Description}
                          src={
                            Team.TeamType === 1
                              ? `https://api.fifa.com/api/v1/picture/flags-sq-3/${Team.IdCountry}`
                              : `https://api.fifa.com/api/v1/picture/teams-sq-3/${Team.IdTeam}`
                          }
                          fallbackSrc={fallbackImg}
                        />
                      </span>
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
            </Fragment>
          )
        })}
    </div>
  )
}
export default Standings
