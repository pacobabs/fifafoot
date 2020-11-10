import React from 'react'
import Layout from '@components/layout'
import Head from '@components/head'
import Calendar from '@components/calendar/matches'
import { PageProps } from 'gatsby'

const SecondPage = ({ path }: PageProps) => (
  <Layout path={path}>
    <Head title="Calendar" />
    <Calendar />
  </Layout>
)

export default SecondPage
