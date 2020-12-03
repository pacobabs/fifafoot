import React from 'react'
import { Link } from 'gatsby'
import logo from '@assets/images/logo.svg'

type Props = {
  path: string
}

const Header = ({ path }: Props) => {
  return (
    <header className="flex flex-col flex-wrap items-center justify-between pt-4 pb-4 bg-indigo-700 md:pt-0 md:pb-0 md:h-16 lg:bg-full md:flex-row md:items-baseline sm:col-start-1 sm:col-span-12">
      <Link to="/">
        <div className="relative w-24 h-4 lg:w-32 lg:h-6">
          <img src={logo} className="absolute w-24 h-4 lg:w-32 lg:h-6 md:mt-1 lg:mt-2" />
        </div>
      </Link>
      <div className="flex flex-wrap flex-grow justify-center text-sm gap-1 md:text-base mt-2.5 text-yellow-50 sm:gap-2 lg:gap-3 sm:flex-row font-recursive uppercase font-bold">
        <Link to="/" className={`md:text-base md:block ${path === 'live' ? 'selected' : ''}`}>
          Live Scores
        </Link>
        <Link to="/calendar" className={`md:text-base md:block ${path === 'calendar' ? 'selected' : ''}`}>
          Results
        </Link>
        <Link to="/teams" className={`md:text-base md:block ${path === 'teams' ? 'selected' : ''}`}>
          Tournaments
        </Link>
      </div>
      <div className="flex gap-1 ml-8 mr-6 text-indigo-100">
        <span>Login |</span>
        <span>Register</span>
      </div>
    </header>
  )
}
export default Header
