import React from 'react'
import { useCompetitions } from '@store/selectors'
import { addCompetition, removeCompetition } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'

type Props = {
  term: string
  find: (term: string) => boolean
  favorites?: boolean
}

const CompetitionsList = ({ term, find, favorites = false }: Props) => {
  console.count('Competitions')
  const { competitions, myCompetitions } = useCompetitions()
  return (
    <>
      {competitions.map(({ IdCompetition, IdMemberAssociation, Name }) => {
        if (term.length >= 3 && !find(Name[0].Description)) return null
        if (favorites && term.length < 3 && !myCompetitions.includes(IdCompetition)) return null
        return (
          <div key={IdCompetition} className="flex flex-col items-center">
            <Star
              list={myCompetitions}
              id={IdCompetition}
              addAction={addCompetition}
              removeAction={removeCompetition}
            />
            <div className="relative w-8 h-8">
              <Image
                className="w-8 h-8  object-contain"
                src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${IdCompetition}`}
                fallbackSrc="/images/shield.svg"
              />
            </div>
            <span className="block text-center min-w-max">
              {IdMemberAssociation[0]} - {Name[0].Description}
            </span>
          </div>
        )
      })}
    </>
  )
}
export default CompetitionsList
