import React, { MutableRefObject } from 'react'
import { isSameDay, getLocaleMatchDay } from '@utils'

type Props = {
  MatchDate: string
  lastMatchdate: MutableRefObject<string>
}

const MatchDateInfo = ({ MatchDate, lastMatchdate }: Props) => {
  if (isSameDay(new Date(MatchDate), new Date(lastMatchdate.current))) return null
  lastMatchdate.current = MatchDate
  return (
    <div className="px-1 py-0.5 font-bold font-recursive text-indigo-900 bg-indigo-100 text-center">
      {getLocaleMatchDay(MatchDate)}
    </div>
  )
}

export default MatchDateInfo
