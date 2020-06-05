import React from 'react'
import { Match } from '@services/types'

type Props = {
  match: Match
  hidden: boolean
}

const Lineups = ({ match, hidden }: Props) => {
  return (
    <div className={`match lineups ${hidden ? 'hidden' : ''}`}>
      <div>
        <div className="team"></div>
        <div className="team away"></div>
      </div>
    </div>
  )
}
export default Lineups
