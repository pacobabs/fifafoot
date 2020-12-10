import { CreatePageArgs, SourceNodesArgs } from 'gatsby'
import fetch from 'cross-fetch'
import { Result, Country, Confederation, Competition, Season, Team } from './src/services/types'
const API = 'https://api.fifa.com/api/v1/'

const fetcher = async function <JSON>(url: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(`${API}${url}`, init)
  return res.json()
}

const YEAR = 2021

export default () => ({
  onCreatePage: async ({ page, actions }: CreatePageArgs) => {
    const { createPage } = actions
    if (page.path.match(/^\/live/)) {
      page.matchPath = '/live/*'
      createPage(page)
    }
    if (page.path.match(/^\/liveresults/)) {
      page.matchPath = '/liveresults/*'
      createPage(page)
    }
    if (page.path.match(/^\/calendar/)) {
      page.matchPath = '/calendar/*'
      createPage(page)
    }
  },
  sourceNodes: async ({ actions, createNodeId, createContentDigest }: SourceNodesArgs) => {
    const { createNode } = actions
    const promises = [
      fetcher<Result<Country>>('countries?count=1000'),
      fetcher<Result<Confederation>>('confederations?count=1000'),
      fetcher<Result<Competition>>('competitions?count=1000'),
      fetcher<Result<Season>>(`seasons/search?name=${YEAR}&count=1000`)
    ] as const // For Unwraping promises types
    const createCountry = (country: Country) => {
      const node = {
        ...country,
        id: createNodeId(country.IdCountry),
        internal: {
          type: 'countries',
          contentDigest: createContentDigest(country)
        }
      }
      createNode(node)
    }
    const createConfederation = (confederation: Confederation) => {
      const node = {
        ...confederation,
        id: createNodeId(confederation.IdConfederation),
        internal: {
          type: 'confederations',
          contentDigest: createContentDigest(confederation)
        }
      }
      createNode(node)
    }
    const createCompetition = async (competition: Competition) => {
      const node = {
        ...competition,
        id: createNodeId(competition.IdCompetition),
        internal: {
          type: 'competitions',
          contentDigest: createContentDigest(competition)
        }
      }
      createNode(node)
    }
    const createSeason = (season: Season) => {
      const node = {
        ...season,
        id: createNodeId(season.IdSeason),
        internal: {
          type: 'seasons',
          contentDigest: createContentDigest(season)
        }
      }
      createNode(node)
    }
    const createTeam = (team: Team) => {
      const node = {
        ...team,
        id: createNodeId(team.IdTeam),
        internal: {
          type: 'Teams',
          contentDigest: createContentDigest(team)
        }
      }
      createNode(node)
    }
    const [countries, confederations, competitions, seasons] = await Promise.all(promises)
    countries.Results.map(createCountry)
    confederations.Results.map(createConfederation)
    competitions.Results.map(createCompetition)
    seasons.Results.map(createSeason)
    const teamRequests = competitions.Results.map(({ IdCompetition: competitionId }) => {
      const season = seasons.Results.find(({ IdCompetition }) => IdCompetition === competitionId)
      return season
        ? fetcher<Result<Team>>(`teams/squads/all/${season?.IdCompetition}/${season?.IdSeason}`)
        : Promise.resolve({ Results: [] })
    })
    const responses = await Promise.all(teamRequests)
    responses.map((response) => response?.Results?.map(createTeam))
  }
})
