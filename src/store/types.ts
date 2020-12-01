import { Dispatch as ReactDispatch, SetStateAction } from 'react'
import { Country, Confederation, Competition, Season, Match, TeamMatch } from '@services/types'

export type IStateContext = React.Context<State>

export type IDispatchContext = React.Context<Dispatch>

export type Dispatch = ReactDispatch<Action>

export type Selector = (state: State) => State[keyof State]

export type CountrySelector = {
  countries: Country[]
  myCountries: string[]
}

export type ConfederationSelector = {
  confederations: Confederation[]
  myConfederations: string[]
}

export type CompetitionSelector = {
  competitions: Competition[]
  myCompetitions: string[]
}

export type TeamSelector = {
  teams: TeamMatch[]
  myTeams: string[]
}

export type SeasonSelector = {
  seasons: Season[]
}

export type MatchSelector = {
  matches: { [key: string]: Match[] }
}

export type State = CountrySelector &
  ConfederationSelector &
  CompetitionSelector &
  TeamSelector &
  SeasonSelector &
  MatchSelector

export type SetFilterStateAction = ReactDispatch<SetStateAction<string>>

// actions
export enum ActionTypes {
  setCountries = 'Countries/set',
  addCountry = 'Country/add',
  removeCountry = 'Country/remove',
  setConfederations = 'Confederations/set',
  addConfederation = 'Confederation/add',
  removeConfederation = 'Confederation/remove',
  setCompetitions = 'Competitions/set',
  addCompetition = 'Competition/add',
  removeCompetition = 'Competition/remove',
  setSeasons = 'Seasons/set',
  setMatches = 'Matches/set',
  setMatch = 'Match/set',
  setTeams = 'Teams/set',
  addTeam = 'TeamMatch/add',
  removeTeam = 'TeamMatch/remove'
}

export type ActionCreators = {
  setCountries: (c: Country[]) => Action
  addCountry: (c: string) => Action
  removeCountry: (c: string) => Action
  setConfederations: (c: Confederation[]) => Action
  addConfederation: (c: string) => Action
  removeConfederation: (c: string) => Action
  setCompetitions: (c: Competition[]) => Action
  addCompetition: (c: string) => Action
  removeCompetition: (c: string) => Action
  setSeasons: (s: Season[]) => Action
  setMatches: (c: string, m: Match[]) => Action
  setMatch: (c: string, m: Match) => Action
  setTeams: (t: TeamMatch[]) => Action
  addTeam: (t: string) => Action
  removeTeam: (t: string) => Action
}

export type Action =
  | ActionType<CountriesPayload>
  | ActionType<ConfederationsPayload>
  | ActionType<CompetitionsPayload>
  | ActionType<SeasonsPayload>
  | ActionType<MatchesPayload>
  | ActionType<TeamsPayload>

type CountriesPayload = {
  [ActionTypes.setCountries]: Country[]
  [ActionTypes.addCountry]: string
  [ActionTypes.removeCountry]: string
}

type ConfederationsPayload = {
  [ActionTypes.setConfederations]: Confederation[]
  [ActionTypes.addConfederation]: string
  [ActionTypes.removeConfederation]: string
}

type CompetitionsPayload = {
  [ActionTypes.setCompetitions]: Competition[]
  [ActionTypes.addCompetition]: string
  [ActionTypes.removeCompetition]: string
}

type SeasonsPayload = {
  [ActionTypes.setSeasons]: Season[]
}

type MatchesPayload = {
  [ActionTypes.setMatches]: { IdCompetition: string; matches: Match[] }
  [ActionTypes.setMatch]: { IdCompetition: string; match: Match }
}

type TeamsPayload = {
  [ActionTypes.setTeams]: TeamMatch[]
  [ActionTypes.addTeam]: string
  [ActionTypes.removeTeam]: string
}

// Utulity types

type ActionType<Payload> = Map<Payload>[keyof Map<Payload>]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Map<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}
