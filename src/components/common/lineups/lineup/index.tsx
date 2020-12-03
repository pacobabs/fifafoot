import React from 'react'
import { TeamMatch } from '@services/types'
import subInImg from '@assets/images/substitution-in.svg'
import subOutImg from '@assets/images/substitution-out.svg'
import Image from '@components/common/image'
import TeamLogo from '@components/common/team-logo'

type Props = {
  team: TeamMatch
  matchStatus: number
  away?: boolean
}

const Lineup = ({ team, matchStatus, away }: Props) => {
  return (
    <div className={`flex flex-col w-1/2 justify-between ${away ? 'text-right' : ''}`}>
      <div>
        <br />
        <TeamLogo team={team} className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${away ? '-mr-1' : '-ml-1'}`} />
        <br />
        <br />
        {team.Players.filter(({ Status }) => Status === 1).map(({ IdPlayer, ShirtNumber, PlayerName }) => {
          const PlayerOff = team.Substitutions.find(({ IdPlayerOff }) => IdPlayerOff === IdPlayer) ? (
            <img className="inline-block" src={subOutImg} />
          ) : (
            ''
          )
          return (
            <span className={`flex gap-0.5 ${away ? 'flex-row-reverse' : ''}`} key={IdPlayer}>
              <span className="w-4">{ShirtNumber}</span> <span>{PlayerName[0].Description}</span> {PlayerOff}
            </span>
          )
        })}
        {matchStatus === 1 ? (
          ''
        ) : (
          <>
            <br />
            <p className="pb-1 -mt-1">
              <b>SUBSTITUTES</b>
            </p>
            {team.Players.filter(({ Status }) => Status === 2).map(({ IdPlayer, ShirtNumber, PlayerName }) => {
              const PlayerOn = team.Substitutions.find(({ IdPlayerOn }) => IdPlayerOn === IdPlayer) ? (
                <img src={subInImg} />
              ) : (
                ''
              )
              return (
                <span className={`flex gap-0.5 ${away ? 'flex-row-reverse' : ''}`} key={IdPlayer}>
                  <span className="w-4">{ShirtNumber}</span> <span>{PlayerName[0].Description}</span> {PlayerOn}
                </span>
              )
            })}{' '}
          </>
        )}
      </div>
      <div className="pt-3">
        <br />
        <TeamLogo team={team} className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${away ? '-mr-1' : '-ml-1'}`} />
        <br />
        <p>
          <b>MANAGER</b>
          <br />
          <span className={`flex gap-2 ${away ? 'flex-row-reverse' : ''}`}>
            {team.Coaches[0]?.Name[0].Description}
            <span className="relative w-4 h-4">
              <Image
                className="absolute mt-0.5 object-contain"
                src={`https://api.fifa.com/api/v1/picture/flags-sq-1/${team.Coaches[0]?.IdCountry}`}
              />
            </span>
          </span>
        </p>
        <hr />
      </div>
    </div>
  )
}
export default Lineup
