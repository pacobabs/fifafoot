import React from 'react'
import { useSearch } from '@services'
import Search from '@components/common/search'
import ConfederationsList from '@components/confederations/confederations-list'
import CountriesList from '@components/countries/countries-list'
import CompetitionsList from '@components/competitions/competitions-list'
import TeamsList from '@components/teams/teams-list'

const Favorites = () => {
  const { term, search, find } = useSearch()
  return (
    <div className="pt-1">
      <div className="text-indigo-50 font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 mb-1 pb-0.5 font-recursive">
        FAVORITES
      </div>
      <Search term={term} search={search} />
      <div className="flex h-20 gap-8 py-1 overflow-x-scroll scrollbar">
        <ConfederationsList term={term} find={find} favorites={true} />
        <CountriesList term={term} find={find} favorites={true} />
        <CompetitionsList term={term} find={find} favorites={true} />
        <TeamsList term={term} find={find} favorites={true} />
      </div>
    </div>
  )
}
export default Favorites
