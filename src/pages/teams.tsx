import React from 'react'
import Layout from '@components/layout'
import Head from '@components/head'
import Teams from '@components/teams'
import { PageProps } from 'gatsby'

const SecondPage = ({ path }: PageProps) => (
  <Layout path={path}>
    <Head title="Teams" />
    <Teams />
  </Layout>
)

export default SecondPage
