import React from 'react'
import { Link } from 'gatsby'
import { VIEW } from '@services'
import { useTeams } from '@store/selectors'

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
      {teams.map(({ IdTeam, TeamName }) => {
        if (term && !find(TeamName[0].Description)) return null
        if (myTeams && !myTeams.includes(IdTeam)) return null
        return (
          <li key={IdTeam}>
            <Link to={`/${path}/${VIEW.FAVORITES}/${VIEW.TEAM}/${IdTeam}`} className={id === IdTeam ? 'selected' : ''}>
              {TeamName[0].Description}
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default Teams
