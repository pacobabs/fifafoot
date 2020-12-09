import React from 'react'
import { useTeams, useCompetitions } from '@store/selectors'
import { addTeam, removeTeam } from '@store/actions'
import Star from '@components/common/star'
import Image from '@components/common/image'
import fallbackImg from '@assets/images/football-club.svg'

type Props = {
  term: string
  find: (term: string) => boolean
  favorites?: boolean
}

const TeamsList = ({ term, find, favorites = false }: Props) => {
  console.count('TEAMS')
  const { teams, myTeams } = useTeams()
  const { myCompetitions } = useCompetitions()
  return (
    <>
      {teams.map(({ IdTeam, IdCountry, TeamType, IdCompetition, TeamName }) => {
        if (term.length >= 3 && !find(TeamName[0].Description)) return null
        if (term && term.length < 3 && !myTeams.includes(IdTeam)) return null
        if (!term && !myCompetitions.includes(IdCompetition) && !myTeams.includes(IdTeam)) return null
        if (favorites && term.length < 3 && !myTeams.includes(IdTeam)) return null
        return (
          <div key={IdTeam} className="flex flex-col items-center">
            <Star list={myTeams} id={IdTeam} addAction={addTeam} removeAction={removeTeam} />
            <div className="relative w-8 h-8">
              <Image
                className="object-contain w-8 h-8"
                src={
                  TeamType === 1
                    ? `https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`
                    : `https://api.fifa.com/api/v1/picture/teams-sq-3/${IdTeam}`
                }
                fallbackSrc={fallbackImg}
              />
            </div>
            <span className="block text-center min-w-max">{TeamName[0].Description}</span>
          </div>
        )
      })}
    </>
  )
}
export default TeamsList
