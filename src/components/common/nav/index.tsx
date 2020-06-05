import React from 'react'
import { Link } from 'gatsby'

type Props = {
  path: string
}

const Nav = ({ path }: Props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link className={path === '/teams/' ? 'selected' : ''} to="/teams">
            TEAMS
          </Link>
        </li>
        <li>
          <Link className={path === '/calendar/' ? 'selected' : ''} to="/calendar">
            CALENDAR
          </Link>
        </li>
        <li>
          <Link className={path === '/live/' ? 'selected' : ''} to="/">
            LIVE
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Nav
