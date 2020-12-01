import React from 'react'
import { TeamMatch } from '@services/types'
import yellowCardImg from '@assets/images/yellow-card-right.svg'
import redCardImg from '@assets/images/red-card-right.svg'
import yellowRedCardImg from '@assets/images/yellow-to-red-right.svg'

type Props = {
  home: TeamMatch
  away: TeamMatch
}

const CARD = {
  1: yellowCardImg,
  2: redCardImg,
  3: yellowRedCardImg
} as { [key: number]: string }

const getBooked = (IdBooked: string, team: TeamMatch) => team.Players.find(({ IdPlayer }) => IdPlayer === IdBooked)

const Bookings = ({ home, away }: Props) => (
  <div className="flex px-1 bg-gradient-to-r from-gray-50 via-indigo-100 to-gray-50">
    <div className="flex flex-col w-1/2">
      {home.Bookings.map(({ Card, Minute, IdPlayer }, index) => {
        const player = getBooked(IdPlayer, home)
        return (
          <span key={index}>
            {player?.PlayerName[0].Description} {Minute} <img className="inline-block" src={CARD[Card]} />
          </span>
        )
      })}
    </div>
    <div className="flex flex-col w-1/2 text-right">
      {away.Bookings.map(({ Card, Minute, IdPlayer }, index) => {
        const player = getBooked(IdPlayer, away)
        return (
          <span key={index}>
            <img className="inline-block" src={CARD[Card]} /> {player?.PlayerName[0].Description} {Minute}
          </span>
        )
      })}
    </div>
  </div>
)

export default Bookings
