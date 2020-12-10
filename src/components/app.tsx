import React, { ReactNode } from 'react'
import { StaticQuery, graphql } from 'gatsby'
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

const query = graphql`
  query DataQuery {
    allCountries {
      countries: nodes {
        GracenoteCode
        IdCountry
        Iso3166Alpha2
        Iso3166Alpha3
        Name
        Alias {
          Description
          Locale
        }
      }
    }
    allConfederations {
      confederations: nodes {
        Address
        CityName
        ConfederationAcronym {
          Description
          Locale
        }
        ContactBusinessPhone
        ContactEmail
        ContactFax
        ContactMediaCommunicationsPhone
        Country
        Description {
          Description
          Locale
        }
        IdConfederation
        Name {
          Description
          Locale
        }
        NumberOfAssociations
        OrderPosition
        Organisation {
          Country
          DateOfBirth
          DisplayName {
            Description
            Locale
          }
          FirstName
          IdAssociation
          IdConfederation
          IdOrganisationMember
          LastName
          OrganisationBeginDate
          Role
          RoleBeginDate
          RoleTypeDescription {
            Description
            Locale
          }
        }
        PictureUrl
        Properties {
          IdIFES
        }
        WebSite
      }
    }
    allCompetitions {
      competitions: nodes {
        CompetitionType
        FootballType
        Gender
        IdCompetition
        IdConfederation
        IdMemberAssociation
        IdOwner
        Name {
          Description
          Locale
        }
        Properties {
          IdIFES
          IdInfostrada
        }
        TeamType
      }
    }
    allSeasons {
      seasons: nodes {
        StartDate
        EndDate
        IdSeason
        IdCompetition
        IdConfederation
        IdMemberAssociation
        Name {
          Description
        }
      }
    }
    allTeams {
      teams: nodes {
        IdTeam
        IdCountry
        IdCompetition
        IdSeason
        PictureUrl
        TeamName {
          Description
          Locale
        }
        ParticipationStatus
        Officials {
          Alias {
            Description
            Locale
          }
          BirthDate
          IdCoach
          IdCountry
          IdTeam
          JoinDate
          LeaveDate
          Name {
            Description
            Locale
          }
          Properties {
            GracenoteIfesId
            IdInfostrada
          }
          Role
          SpecialStatus
        }
        Players {
          BirthDate
          Goals
          IdPlayer
          IdTeam
          JerseyNum
          JoinDate
          LeaveDate
          MatchesPlayed
          PlayerName {
            Description
            Locale
          }
          Position
          Properties {
            GracenoteIfesId
            IdInfostrada
          }
          RealPosition
          RealPositionSide
          RedCards
          ShortName {
            Description
            Locale
          }
          SpecialStatus
          YellowCards
        }
        Properties {
          IdInfostrada
        }
      }
    }
  }
`

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
