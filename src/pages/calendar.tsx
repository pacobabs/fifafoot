import React from 'react'
import { Router } from '@reach/router'
import Layout from '@components/layout'
import Head from '@components/head'
import Calendar from '@components/calendar/matches'

const CalendarPage = () => (
  <Layout path="calendar">
    <Head title="Calendar" />
    <Router>
      <Calendar path="/calendar/*params" />
    </Router>
  </Layout>
)

export default CalendarPage
