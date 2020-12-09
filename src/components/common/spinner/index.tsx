import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-24">
      <div className="w-4 h-4 border-t-2 border-b-2 border-indigo-200 rounded-full animate-spin"></div>
    </div>
  )
}
export default Spinner
