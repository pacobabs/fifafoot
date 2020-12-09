import React from 'react'
import Layout from '@components/layout'
import Head from '@components/head'
import Countries from '@components/countries'
import Confederations from '@components/confederations'
import Competitions from '@components/competitions'
import Teams from '@components/teams'
import Favorites from '@components/favorites'

const SecondPage = () => (
  <Layout path="teams">
    <Head title="Teams" />
    <div className="bg-indigo-50">
      <Confederations />
      <Countries />
      <Competitions />
      <Teams />
      <Favorites />
    </div>
  </Layout>
)

export default SecondPage
