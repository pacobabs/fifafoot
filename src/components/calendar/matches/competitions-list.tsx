import React from 'react'
import { Link } from 'gatsby'
import { VIEW } from '@services'
import { useCompetitions } from '@store/selectors'
import { Competition } from '@services/types'

type Props = {
  path: string
  selected: string
  filter: string
  populars: Competition[]
  term: string
  find: (s: string) => boolean
  live?: boolean
}

const Competitions = ({ path, selected, filter, populars, term, find, live = false }: Props) => {
  const { competitions, myCompetitions } = useCompetitions()
  const competitionsList = filter === VIEW.POPULAR ? populars : competitions
  const id = live && selected === 'ALL' ? '' : selected || competitionsList[0].IdCompetition
  return (
    <>
      {live && (
        <li>
          <Link to={`/${path}/${filter}/${VIEW.COMPETITION}/ALL`} className={selected === 'ALL' ? 'selected' : ''}>
            ALL
          </Link>
        </li>
      )}
      {competitionsList.map(({ IdCompetition, Name }) => {
        if (term && !find(Name[0].Description)) return null
        if (filter === VIEW.FAVORITES && myCompetitions && !myCompetitions.includes(IdCompetition)) return null
        return (
          <li key={IdCompetition}>
            <Link
              to={`/${path}/${filter}/${VIEW.COMPETITION}/${IdCompetition}`}
              className={id === IdCompetition ? 'selected' : ''}
            >
              {Name[0].Description}
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default Competitions
