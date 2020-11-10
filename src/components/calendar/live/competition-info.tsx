import React, { MutableRefObject } from 'react'

type Props = {
  competition: string
  lastCompetition: MutableRefObject<string>
}

const MatchDateInfo = ({ competition, lastCompetition }: Props) => {
  if (competition === lastCompetition.current) return null
  lastCompetition.current = competition
  return (
    <section>
      <div>{competition}</div>
    </section>
  )
}

export default MatchDateInfo
