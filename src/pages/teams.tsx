import React from 'react'
import Layout from '@components/layout'
import Head from '@components/head'
import Nav from '@components/common/nav'
import Teams from '@components/teams'
import { PageProps } from 'gatsby'

const SecondPage = ({ path }: PageProps) => (
  <Layout>
    <Head title="Teams" />
    <Nav path={path} />
    <Teams />
  </Layout>
)

export default SecondPage
