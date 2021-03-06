import React from 'react'
import { useCompetitions } from '@store/selectors'
import { addCompetition, removeCompetition } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'
import fallbackImg from '@assets/images/trophy.svg'

type Props = {
  term: string
  find: (term: string) => boolean
  favorites?: boolean
}

const CompetitionsList = ({ term, find, favorites = false }: Props) => {
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
                className="object-contain w-8 h-8"
                src={`https://api.fifa.com/api/v1/picture/competitions-sq-3/${IdCompetition}`}
                alt={Name[0].Description}
                fallbackSrc={fallbackImg}
              />
            </div>
            <span className="block text-center min-w-max font-inter text-indigo-600">
              {IdMemberAssociation[0] ? `${IdMemberAssociation[0]} -` : ''} {Name[0].Description}
            </span>
          </div>
        )
      })}
    </>
  )
}
export default CompetitionsList
