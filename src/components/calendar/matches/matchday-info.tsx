import React, { MutableRefObject } from 'react'

type Props = {
  MatchDay: string
  lastMatchday: MutableRefObject<string>
}

const MatchDayInfo = ({ MatchDay, lastMatchday }: Props) => {
  if (lastMatchday.current === MatchDay) return null
  lastMatchday.current = MatchDay
  return (
    <div className="px-1 py-0.5 font-bold font-recursive text-indigo-900 bg-indigo-100 text-center">
      MATCHDAY {MatchDay}
    </div>
  )
}

export default MatchDayInfo
