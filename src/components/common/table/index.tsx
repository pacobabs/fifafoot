import React from 'react'
import { useCompetitions, useCountries } from '@store/selectors'
import { usePopularCompetitions, useCurrentSeasonInfo } from '@services'
import Image from '@components/common/image'

const Table = () => {
  const { countries } = useCountries()
  const populars = usePopularCompetitions()
  const res = useCurrentSeasonInfo('COMPETITION', populars[0].IdCompetition)
  console.log(res)
  return (
    <div className="bg-indigo-50 sm:col-start-1 sm:col-span-2 md:col-start-11 md:col-span-2 md:row-start-2 md:row-end-4">
      <div className="text-indigo-50 font-bold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 px-1 pt-1 pb-0.5 font-recursive">
        PREMIER LEAGUE
      </div>
    </div>
  )
}
export default Table
