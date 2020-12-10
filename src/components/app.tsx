import React, { ReactNode } from 'react'
import { StaticQuery } from 'gatsby'
import query from '@services/data'
import { Provider } from '@store'

type Props = {
  element: ReactNode
}

const store = {
  countries: [],
  confederations: [],
  competitions: [],
  seasons: [],
  matches: {},
  teams: [],
  myCountries: [],
  myConfederations: [],
  myCompetitions: [],
  myTeams: []
}

const App = ({ element }: Props) => {
  return (
    <StaticQuery
      query={query}
      render={({
        allCountries: { countries },
        allConfederations: { confederations },
        allCompetitions: { competitions },
        allSeasons: { seasons },
        allTeams: { teams }
      }) => (
        <Provider
          state={{
            ...store,
            countries,
            confederations,
            competitions,
            seasons,
            teams
          }}
        >
          {element}
        </Provider>
      )}
    />
  )
}

export default App
