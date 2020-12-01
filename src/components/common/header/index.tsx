import React from 'react'
import { Link } from 'gatsby'

type Props = {
  path: string
}

const Header = ({ path }: Props) => {
  return (
    <header className="flex flex-col flex-wrap items-center justify-between pt-4 pb-4 bg-indigo-700 md:pt-0 md:pb-0 md:h-16 lg:bg-full md:flex-row md:items-baseline sm:col-start-1 sm:col-span-12">
      <Link to="/">
        <h1 className="ml-2 text-xl text-indigo-100 font-logo sm:text-2xl md:text-3xl">LIVE FOOT</h1>
      </Link>
      <div className="flex flex-wrap flex-grow justify-center text-xs gap-1 sm:text-sm md:text-base md:mt-2.5 mt-0.5 text-yellow-50 sm:gap-2 lg:gap-3 sm:flex-row font-recursive uppercase font-bold">
        <Link to="/teams" className={`md:text-base md:block ${path === 'teams' ? 'selected' : ''}`}>
          Tournaments
        </Link>
        <Link to="/" className={`md:text-base md:block ${path === 'live' ? 'selected' : ''}`}>
          Live Scores
        </Link>
        <Link to="/calendar" className={`md:text-base md:block ${path === 'calendar' ? 'selected' : ''}`}>
          Results
        </Link>
      </div>
      <div className="flex gap-1 ml-8 mr-6 text-indigo-200">
        <span>Login |</span>
        <span>Register</span>
      </div>
    </header>
  )
}
export default Header
