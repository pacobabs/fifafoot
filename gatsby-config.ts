export default {
  // flags: {
  //   PRESERVE_WEBPACK_CACHE: true
  // },
  // siteMetadata: {
  //   title: `Live Foot`,
  //   description: `Live matches results. All game from all countries via the FIFA API.`,
  //   author: `@pacobabs`
  // },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-codegen',
    //   options: {
    //     output: '__types__',
    //     tsFileExtension: 'ts',
    //     watch: process.env.WATCH
    //   }
    // },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@assets': 'src/assets',
          '@components': 'src/components',
          '@services': 'src/services',
          '@store': 'src/store',
          '@utils': 'src/utils'
        }
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
