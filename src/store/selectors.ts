import { useSelector } from 'react-reduce-hooks'
import { Competition, Team } from '@services/types'
import {
  CountrySelector,
  ConfederationSelector,
  CompetitionSelector,
  TeamSelector,
  SeasonSelector,
  MatchSelector
} from './types'

export const useCountries = (): CountrySelector => {
  const countries = useSelector((state) => state.countries)
  const myCountries = useSelector((state) => state.myCountries)
  return { countries, myCountries }
}

export const useConfederations = (): ConfederationSelector => {
  const confederations = useSelector((state) => state.confederations)
  const myConfederations = useSelector((state) => state.myConfederations)
  return { confederations, myConfederations }
}

export const useCompetitions = (): CompetitionSelector => {
  const { myCountries } = useCountries()
  const { myConfederations } = useConfederations()
  const competitions = useSelector((state) => state.competitions).sort(
    (competitionA: Competition, competitionB: Competition) => {
      const isFromFavoriteCountryA = myCountries.includes(competitionA.IdMemberAssociation?.[0]) ? 0 : 1
      const isFromFavoriteCountryB = myCountries.includes(competitionB.IdMemberAssociation?.[0]) ? 0 : 1
      const sortCountry = isFromFavoriteCountryA - isFromFavoriteCountryB
      const isFromFavoriteConfederationA = myConfederations.includes(competitionA.IdOwner) ? 0 : 1
      const isFromFavoriteConfederationB = myConfederations.includes(competitionB.IdOwner) ? 0 : 1
      const sortConfederation = isFromFavoriteConfederationA - isFromFavoriteConfederationB
      return sortCountry === 0 ? sortConfederation : sortCountry
    }
  )
  const myCompetitions = useSelector((state) => state.myCompetitions)
  return { competitions, myCompetitions }
}

export const useTeams = (): TeamSelector => {
  const { myCountries } = useCountries()
  const { myConfederations } = useConfederations()
  const { competitions, myCompetitions } = useCompetitions()
  const teams = useSelector((state) => state.teams).sort((teamA: Team, teamB: Team) => {
    const isFromFavoriteCountryA = myCountries.includes(teamA.IdCountry) ? 0 : 1
    const isFromFavoriteCountryB = myCountries.includes(teamB.IdCountry) ? 0 : 1
    const sortCountry = isFromFavoriteCountryA - isFromFavoriteCountryB
    const isFromFavoriteConfederationA = myConfederations.includes(
      competitions.find(({ IdCompetition }) => teamA.IdCompetition === IdCompetition)?.IdOwner || ''
    )
      ? 0
      : 1
    const isFromFavoriteConfederationB = myConfederations.includes(
      competitions.find(({ IdCompetition }) => teamB.IdCompetition === IdCompetition)?.IdOwner || ''
    )
      ? 0
      : 1
    const sortConfederation = isFromFavoriteConfederationA - isFromFavoriteConfederationB
    const isFromFavoriteCompetitionA = myCompetitions.includes(teamA.IdCompetition) ? 0 : 1
    const isFromFavoriteCompetitionB = myCompetitions.includes(teamB.IdCompetition) ? 0 : 1
    const sortCompetition = isFromFavoriteCompetitionA - isFromFavoriteCompetitionB
    return sortCompetition === 0 ? (sortCountry === 0 ? sortConfederation : sortCountry) : sortCompetition
  })
  const myTeams = useSelector((state) => state.myTeams)
  return { teams, myTeams }
}

export const useSeasons = (): SeasonSelector => {
  const seasons = useSelector((state) => state.seasons)
  return { seasons }
}

export const useMatches = (): MatchSelector => {
  const matches = useSelector((state) => state.matches)
  return { matches }
}
