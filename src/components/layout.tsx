import React, { ReactNode } from 'react'
import '@assets/css/tailwind.css'
import Ads from '@components/common/ads'
import Sidebar from '@components/common/sidebar'
import Footer from '@components/common/footer'
import Header from '@components/common/header'
import Table from '@components/common/table'
import Main from '@components/common/main'

type Props = {
  path?: string
  children: ReactNode
}

const Layout = ({ path = '', children }: Props) => {
  return (
    <div className="grid layout text-sm font-crimson md:text-base grid-rows-layout sm:grid-rows-layout-2 sm:grid-cols-12 lg:mx-auto lg:max-w-6xl 2xl:max-w-7xl">
      <Header path={path} />
      <Ads />
      <Main>{children}</Main>
      <Sidebar />
      <Table />
      <Footer />
    </div>
  )
}

export default Layout
