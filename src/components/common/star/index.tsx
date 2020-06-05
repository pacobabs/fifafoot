import React from 'react'
import { useDispatch } from '@store'
import { Action } from '@store/types'
import starImg from '@assets/images/star.png'

type Props = {
  list: string[]
  id: string
  addAction: (id: string) => Action
  removeAction: (id: string) => Action
}

const Star = ({ list, id, addAction, removeAction }: Props) => {
  const dispatch = useDispatch()
  return (
    <>
      {list.includes(id) ? (
        <a
          onClick={() => {
            dispatch(removeAction(id))
          }}
        >
          <img className="star" src={starImg} />
        </a>
      ) : (
        <a
          onClick={() => {
            dispatch(addAction(id))
          }}
        >
          <img className="star gray" src={starImg} />
        </a>
      )}
    </>
  )
}
export default Star
