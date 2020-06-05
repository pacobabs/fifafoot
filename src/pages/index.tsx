import React from 'react'
import Layout from '@components/layout'
import Head from '@components/head'
import Nav from '@components/common/nav'
import Live from '@components/calendar/live'

const LivePage = () => {
  return (
    <Layout>
      <Head title="Live Matches" />
      <Nav path="/live/" />
      <Live />
    </Layout>
  )
}

export default LivePage
