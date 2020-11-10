import React from 'react'
import { TeamMatch } from '@services/types'
import ballImg from '@assets/images/soccer-ball.svg'

type Props = {
  team: TeamMatch
  opponent: TeamMatch
}

const getScorer = (Type: number, IdScorer: string, team: TeamMatch, opponent: TeamMatch) =>
  Type === 3 // Own Goal
    ? opponent.Players.find(({ IdPlayer }) => IdPlayer === IdScorer)
    : team.Players.find(({ IdPlayer }) => IdPlayer === IdScorer)

const TeamGoals = ({ team, opponent }: Props) => {
  const goals = team.Goals.reduce((goals, { Minute, IdPlayer, Type }) => {
    const name = `${Type === 3 ? ' (OG)' : ''} ${getScorer(Type, IdPlayer, team, opponent)?.PlayerName[0].Description}`
    return {
      ...goals,
      [name]: goals[name] ? [...goals[name], Minute] : [Minute]
    }
  }, {} as { [key: string]: string[] })
  return (
    <div
      style={{
        minHeight: `${Math.max(team.Goals.length, opponent.Goals?.length) * 2.234375}em`,
        marginBottom: '0.8125em'
      }}
    >
      {Object.entries(goals).map(([playerName, goals]) => {
        return (
          <p key={playerName}>
            {playerName} {goals.toString().replace(/,/g, ', ')}
          </p>
        )
      })}
    </div>
  )
}

export default TeamGoals
