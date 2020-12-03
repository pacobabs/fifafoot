import React from 'react'
import ballImg from '@assets/images/soccer-ball.svg'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-24">
      <div className="w-4 h-4 border-t-2 border-b-2 border-indigo-200 rounded-full animate-spin">
        <img src={ballImg} className="w-4 h-4 -mt-0.5 scale-150 opacity-70" />
      </div>
    </div>
  )
}
export default Spinner
