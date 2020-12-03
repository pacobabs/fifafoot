import React from 'react'
import { Link } from 'gatsby'
import { VIEW } from '@services'
import { useTeams } from '@store/selectors'
import Image from '@components/common/image'

type Props = {
  path: string
  selected: string
  term: string
  find: (s: string) => boolean
  live?: boolean
}

const Teams = ({ path, selected, term, find, live = false }: Props) => {
  const { teams, myTeams } = useTeams()
  const id = live && selected === 'ALL' ? '' : selected || teams[0].IdTeam
  return (
    <>
      {teams.map(({ IdTeam, IdCountry, TeamType, TeamName }) => {
        if (term && !find(TeamName[0].Description)) return null
        if (myTeams && !myTeams.includes(IdTeam)) return null
        return (
          <li key={IdTeam}>
            <Link
              to={`/${path}/${VIEW.FAVORITES}/${VIEW.TEAM}/${IdTeam}`}
              className={`flex gap-1 ${id === IdTeam ? 'selected' : ''}`}
            >
              <div className="relative w-3 h-3 bg-indigo-50 mt-0.5 rounded-full">
                <Image
                  className="object-contain w-3 h-3"
                  src={
                    TeamType === 1
                      ? `https://api.fifa.com/api/v1/picture/flags-sq-3/${IdCountry}`
                      : `https://api.fifa.com/api/v1/picture/teams-sq-3/${IdTeam}`
                  }
                  fallbackSrc="/images/football-club.svg"
                />
              </div>
              {TeamName[0].Description}
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default Teams
