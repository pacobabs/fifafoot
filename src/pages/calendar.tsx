import React from 'react'
import Layout from '@components/layout'
import Head from '@components/head'
import Nav from '@components/common/nav'
import Calendar from '@components/calendar/matches'
import { PageProps } from 'gatsby'

const SecondPage = ({ path }: PageProps) => (
  <Layout>
    <Head title="Calendar" />
    <Nav path={path} />
    <Calendar />
  </Layout>
)

export default SecondPage
