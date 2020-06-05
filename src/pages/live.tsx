import React from 'react'
import { Router } from '@reach/router'
import Layout from '@components/layout'
import Head from '@components/head'
import Nav from '@components/common/nav'
import LiveMatch from '@components/details'

const SecondPage = () => (
  <Layout>
    <Head title="Live" />
    <Nav path="/live/" />
    <Router>
      <LiveMatch path="/live/*params" />
    </Router>
  </Layout>
)

export default SecondPage
