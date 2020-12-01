import React from 'react'
import { useConfederations } from '@store/selectors'
import { addConfederation, removeConfederation } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'

type Props = {
  term: string
  find: (term: string) => boolean
  favorites?: boolean
}

const ConfederationsList = ({ term, find, favorites = false }: Props) => {
  console.count('Confederations')
  const { confederations, myConfederations } = useConfederations()
  return (
    <>
      {confederations.map(({ IdConfederation, Name }) => {
        if (term.length >= 3 && !find(Name[0].Description) && !find(IdConfederation)) return null
        if (favorites && term.length < 3 && !myConfederations.includes(IdConfederation)) return null
        return (
          <div className="flex flex-col items-center" key={IdConfederation}>
            <Star
              list={myConfederations}
              id={IdConfederation}
              addAction={addConfederation}
              removeAction={removeConfederation}
            />
            <div className="relative object-contain w-8 h-8">
              <Image
                className="w-8 h-8"
                src={`https://api.fifa.com/api/v1/picture/confederations-sq-2/${IdConfederation}`}
                fallbackSrc="/images/shield.svg"
              />
            </div>
            <span className="block text-center min-w-max">{IdConfederation}</span>
          </div>
        )
      })}
    </>
  )
}
export default ConfederationsList