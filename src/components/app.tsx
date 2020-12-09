// import React, { ReactNode } from 'react'
// import useData from '@services/data'
// import { Provider } from '@store'
// import { GraphQLQuery } from '@services/types'

// type Props = {
//   element: ReactNode
// }

// const store = {
//   countries: [],
//   confederations: [],
//   competitions: [],
//   seasons: [],
//   matches: {},
//   teams: [],
//   myCountries: [],
//   myConfederations: [],
//   myCompetitions: [],
//   myTeams: []
// }

// const App = ({ element }: Props) => {
//   const {
//     allCountries: { countries },
//     allConfederations: { confederations },
//     allCompetitions: { competitions },
//     allSeasons: { seasons },
//     allTeams: { teams }
//   } = useData<GraphQLQuery>()
//   return (
//     <Provider
//       store={{
//         ...store,
//         countries,
//         confederations,
//         competitions,
//         seasons,
//         teams
//       }}
//     >
//       {element}
//     </Provider>
//   )
// }

// export default App
