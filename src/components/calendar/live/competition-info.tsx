import React, { MutableRefObject } from 'react'

type Props = {
  competition: string
  lastCompetition: MutableRefObject<string>
}

const MatchDateInfo = ({ competition, lastCompetition }: Props) => {
  if (competition === lastCompetition.current) return null
  lastCompetition.current = competition
  return (
    <div className="px-1 py-0.5 font-bold uppercase font-recursive bg-gradient-to-r from-indigo-600 via-indigo-300 to-indigo-600 text-indigo-50 text-center">
      {competition}
    </div>
  )
}

export default MatchDateInfo
