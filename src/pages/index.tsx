import React from 'react'
import Layout from '@components/layout'
import Head from '@components/head'
import Live from '@components/calendar/live'

const IndexPage = () => (
  <Layout path="live">
    <Head title="Live matches" />
    <Live />
  </Layout>
)

export default IndexPage
