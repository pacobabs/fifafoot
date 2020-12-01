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
    <a
      onClick={() => {
        list.includes(id) ? dispatch(removeAction(id)) : dispatch(addAction(id))
      }}
    >
      <img className={`w-3 h-3 mb-1 ${list.includes(id) ? '' : 'grayscale'}`} src={starImg} />
    </a>
  )
}
export default Star
