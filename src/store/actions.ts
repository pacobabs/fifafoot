import { Action, ActionTypes as _ } from '@store/types'
import { Country, Confederation, Competition, Season, Match, Team } from '@services/types'

export const setCountries = (countries: Country[]): Action => ({
  type: _.setCountries,
  payload: countries
})

export const addCountry = (IdCountry: string): Action => ({
  type: _.addCountry,
  payload: IdCountry
})

export const removeCountry = (IdCountry: string): Action => ({
  type: _.removeCountry,
  payload: IdCountry
})

export const setConfederations = (confederations: Confederation[]): Action => ({
  type: _.setConfederations,
  payload: confederations
})

export const addConfederation = (IdConfederation: string): Action => ({
  type: _.addConfederation,
  payload: IdConfederation
})

export const removeConfederation = (IdConfederation: string): Action => ({
  type: _.removeConfederation,
  payload: IdConfederation
})

export const setCompetitions = (competitions: Competition[]): Action => ({
  type: _.setCompetitions,
  payload: competitions
})

export const addCompetition = (IdCompetition: string): Action => ({
  type: _.addCompetition,
  payload: IdCompetition
})

export const removeCompetition = (IdCompetition: string): Action => ({
  type: _.removeCompetition,
  payload: IdCompetition
})

export const setMatches = (IdCompetition: string, matches: Match[]): Action => ({
  type: _.setMatches,
  payload: { IdCompetition, matches }
})

export const setMatch = (IdCompetition: string, match: Match): Action => ({
  type: _.setMatch,
  payload: { IdCompetition, match }
})

export const setSeasons = (seasons: Season[]): Action => ({
  type: _.setSeasons,
  payload: seasons
})

export const setTeams = (teams: Team[]): Action => ({
  type: _.setTeams,
  payload: teams
})

export const addTeam = (IdTeam: string): Action => ({
  type: _.addTeam,
  payload: IdTeam
})

export const removeTeam = (IdTeam: string): Action => ({
  type: _.removeTeam,
  payload: IdTeam
})
