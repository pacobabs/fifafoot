import React from 'react'
import App from './app'
import { useStaticQuery } from 'gatsby'
import { render } from '@test/testUtils'

const mockeduseStaticQuery = useStaticQuery as jest.Mock<unknown>

describe('Index page', () => {
  beforeEach(() => {
    mockeduseStaticQuery.mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          title: `Default Starter`
        }
      }
    }))
  })
  it('matches snapshot', () => {
    const { asFragment } = render(<App />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
