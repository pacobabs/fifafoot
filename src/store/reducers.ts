import { ActionTypes as _, State, Action } from '@store/types'
import { Country, Confederation, Competition, Match, Team } from '@services/types'

const globalReducer = (state: State, action: Action) => {
  switch (action.type) {
    case _.addCountry: {
      return { ...state, myCountries: [...state.myCountries, action.payload] }
    }
    case _.removeCountry: {
      const countries = state.myCountries.filter((c) => c !== action.payload)
      return { ...state, myCountries: countries }
    }
    case _.addConfederation: {
      return { ...state, myConfederations: [...state.myConfederations, action.payload] }
    }
    case _.removeConfederation: {
      const confederations = state.myConfederations.filter((c) => c !== action.payload)
      return { ...state, myConfederations: confederations }
    }
    case _.addCompetition: {
      return { ...state, myCompetitions: [...state.myCompetitions, action.payload] }
    }
    case _.removeCompetition: {
      const competitions = state.myCompetitions.filter((c) => c !== action.payload)
      return { ...state, myCompetitions: competitions }
    }
    case _.addTeam: {
      return { ...state, myTeams: [...state.myTeams, action.payload] }
    }
    case _.removeTeam: {
      const teams = state.myTeams.filter((t) => t !== action.payload)
      return { ...state, myTeams: teams }
    }
    default:
      return state
  }
}

const countriesReducer = (state: Country[], action: Action) => {
  switch (action.type) {
    case _.setCountries: {
      return action.payload
    }
    default:
      return state
  }
}

const confederationsReducer = (state: Confederation[], action: Action) => {
  switch (action.type) {
    case _.setConfederations: {
      return action.payload
    }
    default:
      return state
  }
}

const competitionsReducer = (state: Competition[], action: Action) => {
  switch (action.type) {
    case _.setCompetitions: {
      return action.payload
    }
    default:
      return state
  }
}

const matchReducer = (state: { [key: string]: Match[] }, action: Action) => {
  switch (action.type) {
    case _.setMatches: {
      return {
        ...state,
        [action.payload.IdCompetition]: action.payload.matches
      }
    }
    case _.setMatch: {
      const { match } = action.payload
      return {
        ...state,
        [action.payload.IdCompetition]: state[action.payload.IdCompetition].map((oldMatch) =>
          oldMatch.IdMatch === match.IdMatch ? match : oldMatch
        )
      }
    }
    default:
      return state
  }
}

const teamReducer = (state: Team[], action: Action) => {
  switch (action.type) {
    case _.setTeams: {
      return action.payload
    }
    default:
      return state
  }
}

const reducer = (state: State, action: Action): State => {
  const { countries, confederations, competitions, matches, teams } = state
  const newState = {
    ...globalReducer(state, action),
    countries: countriesReducer(countries, action),
    confederations: confederationsReducer(confederations, action),
    competitions: competitionsReducer(competitions, action),
    matches: matchReducer(matches, action),
    teams: teamReducer(teams, action)
  }
  return newState
}

export default reducer
