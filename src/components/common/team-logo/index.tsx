import React from 'react'
import { TeamMatch } from '@services/types'
import Image from '@components/common/image'

type Props = {
  team: TeamMatch
}

const TeamLogo = ({ team }: Props) => (
  <>
    <p>
      <Image
        className="flag"
        src={
          team.TeamType === 0
            ? `https://api.fifa.com/api/v1/picture/teams-sq-3/${team.IdTeam}`
            : `https://api.fifa.com/api/v1/picture/flags-sq-3/${team.IdCountry}`
        }
        fallbackSrc="/images/football-club.svg"
      />
    </p>
  </>
)

export default TeamLogo
