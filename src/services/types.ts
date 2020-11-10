export type Result<T> = {
  Results: T[]
}

export type Name = {
  Description: string
}

export type AllCountries = {
  countries: Country[]
}

export type Country = {
  IdCountry: string
  Name: string
}

export type AllConfederations = {
  confederations: Confederation[]
}

export type Confederation = {
  IdConfederation: string
  Name: Name[]
}

export type AllCompetitions = {
  competitions: Competition[]
}

export type Competition = {
  IdCompetition: string
  IdMemberAssociation: string[]
  IdOwner: string
  Name: Name[]
}

export type AllSeasons = {
  seasons: Season[]
}

export type Season = {
  IdSeason: string
  IdCompetition: string
  IdConfederation: string[]
  IdMemberAssociation: string[]
  StartDate: string
  EndDate: string
  Name: Name[]
}

export type AllMatches = {
  matches: Match[]
}

export type Match = {
  IdMatch: string
  IdCompetition: string
  IdSeason: string
  IdStage: string
  TimeDefined: boolean
  CompetitionName: Name[]
  Date: string
  MatchDay: string
  MatchStatus: number
  MatchTime: string
  Period: number
  Attendance: string
  Stadium: {
    Name: Name[]
  }
  BallPossession: BallPossession
  Away: TeamMatch
  Home: TeamMatch
  AwayTeam: TeamMatch
  HomeTeam: TeamMatch
}

export type Standing = {
  Position: number
  Points: number
  Played: number
  Won: number
  Drawn: number
  Lost: number
  For: number
  Against: number
  Team: Team
}

export type MatchEvents = {
  IdMatch: string
  IdCompetition: string
  IdSeason: string
  IdStage: string
  Event: MatchEvent[]
}

export type MatchEvent = {
  AwayGoals: 0
  AwayPenaltyGoals: 0
  EventDescription: Name[]
  EventId: string
  HomeGoals: number
  HomePenaltyGoals: number
  IdPlayer: string
  IdTeam: string
  MatchMinute: string
  Period: number
  PositionX: number
  PositionY: number
  Timestamp: string
  Type: number
}

export type AllTeams = {
  teams: Team[]
}

export type Team = {
  IdTeam: string
  IdCountry: string
  IdCompetition: string
  IdSeason: string
  Name: Name[]
}

export type TeamMatch = Team & {
  TeamName: Name[]
  TeamType: number
  Score: number
  Players: Player[]
  Goals: Goal[]
  Bookings: Booking[]
  Substitutions: Substitution[]
  Coaches: Coach[]
}

export type Player = {
  IdPlayer: string
  ShirtNumber: number
  Status: number
  FieldStatus: number
  Position: number
  Captain: boolean
  PlayerName: Name[]
  ShortName: Name[]
}

export type Goal = {
  IdAssistPlayer: string
  IdPlayer: string
  Minute: string
  Period: number
  Type: number
}

export type Substitution = {
  IdPlayerOff: string
  IdPlayerOn: string
  Minute: string
}

export type Booking = {
  Card: number
  IdPlayer: string
  IdTeam: string
  Minute: string
}

export type BallPossession = {
  OverallAway: number
  OverallHome: number
}

export type Coach = {
  IdCoach: string
  IdCountry: string
  Name: Name[]
}

export type GraphQLQuery = {
  allCountries: AllCountries
  allConfederations: AllConfederations
  allCompetitions: AllCompetitions
  allSeasons: AllSeasons
  allTeams: AllTeams
  allMatches: AllMatches
}
