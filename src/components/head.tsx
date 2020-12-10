import React from 'react'
import { Helmet } from 'react-helmet'
import favicon from '@assets/images/icon.svg'

type Props = {
  description?: string
  lang?: string
  meta?: []
  title: string
}

const Head = ({ description = ``, lang = `en`, meta = [], title }: Props) => {
  const siteDescription = description || `Live matches results. All game from all countries via the FIFA API.`
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | Livefoot`}
      link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
      meta={[
        {
          name: `description`,
          content: siteDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: siteDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: `pacobabs`
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: siteDescription
        }
      ].concat(meta)}
    />
  )
}

export default Head
