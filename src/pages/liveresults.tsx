import React from 'react'
import Layout from '@components/layout'
import { Router } from '@reach/router'
import Head from '@components/head'
import Live from '@components/calendar/live'

const LivePage = () => {
  return (
    <Layout path="live">
      <Head title="Live Matches" />
      <Router>
        <Live path="/liveresults/*params" />
      </Router>
    </Layout>
  )
}

export default LivePage
