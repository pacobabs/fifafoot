import React from 'react'
import { TeamMatch } from '@services/types'
import subInImg from '@assets/images/substitution-in.svg'
import subOutImg from '@assets/images/substitution-out.svg'
import Image from '@components/common/image'
import TeamLogo from '@components/common/team-logo'

type Props = {
  team: TeamMatch
  matchStatus: number
}

const Lineup = ({ team, matchStatus }: Props) => {
  return (
    <>
      <br />
      <TeamLogo team={team} />
      <br />
      {team.Players.filter(({ Status }) => Status === 1).map(({ IdPlayer, ShirtNumber, PlayerName }) => {
        const PlayerOff = team.Substitutions.find(({ IdPlayerOff }) => IdPlayerOff === IdPlayer) ? (
          <img className="event" src={subOutImg} />
        ) : (
          ''
        )
        return (
          <p key={IdPlayer}>
            <span>{ShirtNumber}</span> <span>{PlayerName[0].Description}</span> {PlayerOff}
          </p>
        )
      })}
      {matchStatus === 1 ? (
        ''
      ) : (
        <>
          <br />
          <p>
            <b>SUBSTITUTES</b>
          </p>
          {team.Players.filter(({ Status }) => Status === 2).map(({ IdPlayer, ShirtNumber, PlayerName }) => {
            const PlayerOn = team.Substitutions.find(({ IdPlayerOn }) => IdPlayerOn === IdPlayer) ? (
              <img className="event" src={subInImg} />
            ) : (
              ''
            )
            return (
              <p key={IdPlayer}>
                <span>{ShirtNumber}</span> <span>{PlayerName[0].Description}</span> {PlayerOn}
              </p>
            )
          })}{' '}
        </>
      )}
      <br />
      <TeamLogo team={team} />
      <p className="manager">
        <b>MANAGER</b>
      </p>
      <p>
        <span>{team.Coaches[0]?.Name[0].Description}</span>
        <span>
          <Image
            className="flag"
            src={`https://api.fifa.com/api/v1/picture/flags-sq-1/${team.Coaches[0]?.IdCountry}`}
          />
        </span>
      </p>
      <hr />
    </>
  )
}
export default Lineup
