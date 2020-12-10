import React, { Dispatch, SetStateAction } from 'react'
import { Link } from 'gatsby'
import Search from '@components/common/search'

type Props = {
  path: string
  filter: string
  type: string
  selected: string
  term: string
  search: (s: string) => void
  live?: boolean
  liveMatch?: boolean
  setLiveMatch?: Dispatch<SetStateAction<boolean>>
}

const VIEW = {
  ALL: 'ALL',
  POPULAR: 'POPULAR',
  FAVORITES: 'FAVORITES'
}

const Filters = ({ path, filter, type, selected, term, search, live = false, liveMatch, setLiveMatch }: Props) => {
  return (
    <>
      <div className="pt-0.5 bg-indigo-500 pb-0 flex justify-center gap-2">
        <Link
          to={`/${path}/${VIEW.ALL}/${type}/${live ? 'ALL' : selected}`}
          className={`text-indigo-50 ${filter === VIEW.ALL ? 'selected' : ''}`}
        >
          All
        </Link>
        <Link
          to={`/${path}/${VIEW.POPULAR}/${type}/${live ? 'ALL' : selected}`}
          className={`text-indigo-50 ${filter === VIEW.POPULAR ? 'selected' : ''}`}
        >
          Popular
        </Link>
        <Link
          to={`/${path}/${VIEW.FAVORITES}/${type}/${live ? 'ALL' : selected}`}
          className={`text-indigo-50 ${filter === VIEW.FAVORITES ? 'selected' : ''}`}
        >
          Favorites
        </Link>
      </div>
      <div className=" bg-indigo-700 pl-0.5 sm:pl-1 flex justify-between px-2 py-1">
        <Search search={search} className="text-indigo-100 bg-indigo-700" />
        {setLiveMatch && (
          <button className="flex items-center gap-1 focus:outline-none" onClick={() => setLiveMatch((live) => !live)}>
            <span
              className={`flex items-center  w-4 h-2 border-pink-100 rounded-full cursor-pointer ${
                liveMatch ? 'justify-end bg-pink-500' : 'justify-start bg-indigo-300'
              }`}
            >
              <span className="w-2 h-2 bg-white border rounded-full shadow-inner"></span>
            </span>
            <span className={`font-semibold ${liveMatch ? 'text-pink-400' : 'text-indigo-300'}`}>LIVE</span>
          </button>
        )}
      </div>
    </>
  )
}
export default Filters
