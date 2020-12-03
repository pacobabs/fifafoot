import React from 'react'
import { useSearch } from '@services'
import Search from '@components/common/search'
import CompetitionsList from './competitions-list'

const Competitions = () => {
  console.count('Competitions')
  const { term, search, find } = useSearch()
  return (
    <div className="pt-1">
      <div className="text-indigo-50 font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 mb-1 pb-0.5 font-recursive">
        COMPETITIONS
      </div>
      <Search search={search} />
      <div className="flex h-20 gap-8 py-1 overflow-x-scroll scrollbar">
        <CompetitionsList term={term} find={find} />
      </div>
    </div>
  )
}
export default Competitions
