import React, { ReactNode } from 'react'
import { Link } from 'gatsby'
import '@assets/css/global.css'
import '@assets/css/app.css'
import Nav from '@components/common/nav'

type Props = {
  path: string
  children: ReactNode
}

const Layout = ({ path, children }: Props) => {
  return (
    <>
      <header>
        <div>
          <h1 style={{ margin: 0 }} className="logo">
            <Link to="/">TEAM ELEVEN</Link>
          </h1>
          <div className="menu">
            <a>LIVE</a>
            <a>LEAGUES</a>
            <a>CALENDAR</a>
            <a>CONTACT</a>
            <a>ADVERTISE</a>
            <a>SETTINGS</a>
          </div>
          <div className="user">
            <a>LOGIN</a>
            <a className="cta">REGISTER</a>
          </div>
        </div>
      </header>
      <Nav path={path} />
      <main>
        <div className="left-nav">
          <span className="nav-header">My leagues</span>
          <span>Premier League</span>
          <span>La Liga</span>
          <span>Bundesliga</span>
          <span>Serie A</span>
          <span>Ligue 1</span>
          <span>World Cup</span>
          <span className="nav-header">My teams</span>
          <span>Liverpool</span>
          <span>Real Madrid</span>
          <span>Barcelona</span>
          <span>Juventus</span>
          <span>Bayern Munchen</span>
          <span>Paris Saint Germain</span>
          <span className="nav-header">My matches</span>
          <span>Senegal</span>
          <span>England</span>
          <span>Spain</span>
          <span>Italy</span>
          <span>Germany</span>
          <span>France</span>
        </div>
        {children}
        <div className="left-nav">
          <div className="register">
            <h1>INSCRIPTION</h1>
            <input type="text" />
            <input type="text" />
            <a className="cta">REGISTER</a>
          </div>
          <span className="nav-header">La Liga Table</span>
          <span>1. Barcelona</span>
          <span>2. Real Madrid</span>
        </div>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
