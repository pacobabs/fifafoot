import React from 'react'
import { Router } from '@reach/router'
import Layout from '@components/layout'
import Head from '@components/head'
import LiveMatch from '@components/details'

const SecondPage = () => (
  <Layout path="/live/">
    <Head title="Live" />
    <Router>
      <LiveMatch path="/live/*params" />
    </Router>
  </Layout>
)

export default SecondPage
