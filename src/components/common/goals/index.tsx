import React from 'react'
import { TeamMatch } from '@services/types'
import ballImg from '@assets/images/soccer-ball.svg'
import { getInitials } from '@utils'

type Props = {
  home: TeamMatch
  away: TeamMatch
}

const getScorer = (Type: number, IdScorer: string, home: TeamMatch, away: TeamMatch) =>
  Type === 3 // Own Goal
    ? away.Players.find(({ IdPlayer }) => IdPlayer === IdScorer)
    : home.Players.find(({ IdPlayer }) => IdPlayer === IdScorer)

const getGoals = (home: TeamMatch, away: TeamMatch) =>
  home.Goals.reduce((goals, { Minute, IdPlayer, Type }) => {
    const name = `${Type === 3 ? ' (OG)' : ''} ${getInitials(
      getScorer(Type, IdPlayer, home, away)?.PlayerName[0].Description
    )}`
    return {
      ...goals,
      [name]: goals[name] ? [...goals[name], Minute] : [Minute]
    }
  }, {} as { [key: string]: string[] })

const TeamGoals = ({ home, away }: Props) => {
  const homeGoals = getGoals(home, away)
  const awayGoals = getGoals(away, home)
  const hasGoals = Object.keys(homeGoals).length || Object.keys(awayGoals).length
  return (
    <div className="flex items-start px-1 py-2 bg-gradient-to-r from-gray-50 via-indigo-100 to-gray-50">
      <div className="flex flex-col w-1/2 text-left">
        {Object.entries(homeGoals).map(([playerName, goals]) => {
          return (
            <span className="block" key={playerName}>
              {playerName} {goals.toString().replace(/,/g, ', ')}
            </span>
          )
        })}
      </div>
      {hasGoals && <img src={ballImg} alt="goals" />}
      <div className="flex flex-col w-1/2 text-right">
        {Object.entries(awayGoals).map(([playerName, goals]) => {
          return (
            <span className="block" key={playerName}>
              {playerName} {goals.toString().replace(/,/g, ', ')}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default TeamGoals
