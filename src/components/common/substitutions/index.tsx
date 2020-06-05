import React from 'react'
import { MatchTeam } from '@services/types'
import subInImg from '@assets/images/substitution_icon.svg'
import subOutImg from '@assets/images/substitution-out.svg'

type Props = {
  team: MatchTeam
  opponent: MatchTeam
}

const getPlayerOnOff = (IdBooked: string, team: MatchTeam) => team.Players.find(({ IdPlayer }) => IdPlayer === IdBooked)

const Substitutions = ({ team, opponent }: Props) => (
  <div
    style={{
      minHeight: `${Math.max(team.Substitutions.length, opponent.Substitutions?.length) * 2.234375}em`,
      marginBottom: '0.8215em'
    }}
  >
    {team.Substitutions.map(({ Minute, IdPlayerOn, IdPlayerOff }, index) => {
      const playerOn = getPlayerOnOff(IdPlayerOn, team)
      const playerOff = getPlayerOnOff(IdPlayerOff, team)
      return (
        <div key={index}>
          <p>
            <img className="event" src={subInImg} /> (IN) {playerOn?.PlayerName[0].Description} {Minute}
          </p>
          <p>
            <img className="event" src={subOutImg} /> (OUT) {playerOff?.PlayerName[0].Description} {Minute}
          </p>
          <hr />
        </div>
      )
    })}
  </div>
)

export default Substitutions
