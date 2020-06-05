import React, { MutableRefObject } from 'react'
import { isSameDay, getLocaleMatchDay } from '@utils'

type Props = {
  MatchDate: string
  lastMatchdate: MutableRefObject<string>
}

const MatchDateInfo = ({ MatchDate, lastMatchdate }: Props) => {
  if (!isSameDay(new Date(MatchDate), new Date(lastMatchdate.current))) {
    lastMatchdate.current = MatchDate
    return (
      <section className="matchdate">
        <div>{getLocaleMatchDay(MatchDate)}</div>
      </section>
    )
  }
  return null
}

export default MatchDateInfo
