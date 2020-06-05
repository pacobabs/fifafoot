import React, { ChangeEvent } from 'react'
import { MatchTeam } from '@services/types'
import TeamGoals from '@components/common/goals'
// import Bookings from '@components/common/bookings'
// import Substitutions from '@components/common/substitutions'
import clubImg from '@assets/images/football-club.svg'

type Props = {
  team: MatchTeam
  opponent: MatchTeam
  atHome: boolean
  showScore: boolean
}

const LiveTeam = ({ team, opponent, atHome, showScore }: Props) => {
  const { TeamName, Score } = team
  const hasGoals = team.Goals?.length > 0 || opponent.Goals?.length > 0
  // const hasBookings = team.Bookings?.length > 0 || opponent.Bookings?.length > 0
  // const hasSubstitutions = team.Substitutions?.length > 0 || opponent.Substitutions?.length > 0
  return (
    <div className={`team ${atHome ? '' : 'away'} `}>
      <div className="team-logo">
        <img
          src={
            team.TeamType === 0
              ? `https://api.fifa.com/api/v1/picture/teams-sq-3/${team.IdTeam}`
              : `https://api.fifa.com/api/v1/picture/flags-sq-3/${team.IdCountry}`
          }
          loading="lazy"
          onError={(e: ChangeEvent<HTMLImageElement>) => {
            e.target.src = clubImg
          }}
        />
        <h1>{TeamName?.[0]?.Description}</h1>
      </div>
      <span className="score">{showScore ? Score : ''}</span>
      {hasGoals && (
        <>
          <hr />
          <TeamGoals team={team} opponent={opponent} />
        </>
      )}
      {/* {hasBookings && (
        <>
          <hr />
          <Bookings team={team} opponent={opponent} />
        </>
      )} */}
      {/* {hasSubstitutions && (
        <>
          <hr />
          <Substitutions team={team} opponent={opponent} />
        </>
      )} */}
    </div>
  )
}
export default LiveTeam
