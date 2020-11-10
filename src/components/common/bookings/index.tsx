import React from 'react'
import { TeamMatch } from '@services/types'
import yellowCardImg from '@assets/images/yellow-card-right.svg'
import redCardImg from '@assets/images/red-card-right.svg'
import yellowRedCardImg from '@assets/images/yellow-to-red-right.svg'

type Props = {
  team: TeamMatch
  opponent: TeamMatch
}

const CARD = {
  1: yellowCardImg,
  2: redCardImg,
  3: yellowRedCardImg
} as { [key: number]: string }

const getBooked = (IdBooked: string, team: TeamMatch) => team.Players.find(({ IdPlayer }) => IdPlayer === IdBooked)

const Bookings = ({ team, opponent }: Props) => (
  <div
    style={{
      minHeight: `${Math.max(team.Bookings.length, opponent.Bookings?.length) * 2.234375}em`,
      marginBottom: '0.8215em'
    }}
  >
    {team.Bookings.map(({ Card, Minute, IdPlayer }, index) => {
      const player = getBooked(IdPlayer, team)
      return (
        <p key={index}>
          <img className="event" src={CARD[Card]} /> {player?.PlayerName[0].Description} {Minute}
        </p>
      )
    })}
  </div>
)

export default Bookings
