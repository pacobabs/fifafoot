import React, { ReactNode } from 'react'
import { Link } from 'gatsby'
import './style.css'
import ballImg from '@assets/images/ball.png'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header>
        <h1 style={{ margin: 0 }} className="logo">
          <Link to="/">
            LIVE - F<img src={ballImg} />
            <img src={ballImg} />T
          </Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
