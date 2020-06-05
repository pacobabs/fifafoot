import React, { MutableRefObject } from 'react'

type Props = {
  MatchDay: string
  lastMatchday: MutableRefObject<string>
}

const MatchDayInfo = ({ MatchDay, lastMatchday }: Props) => {
  if (lastMatchday.current !== MatchDay) {
    lastMatchday.current = MatchDay
    return (
      <>
        <hr />
        <section className="matchday">
          <p>MATCHDAY {MatchDay}</p>
        </section>
      </>
    )
  }
  return null
}

export default MatchDayInfo
