import { CreatePageArgs } from 'gatsby'

export default () => ({
  onCreatePage: async ({ page, actions }: CreatePageArgs) => {
    const { createPage } = actions
    if (page.path.match(/^\/live/)) {
      page.matchPath = '/live/*'
      createPage(page)
    }
    if (page.path.match(/^\/liveresults/)) {
      page.matchPath = '/liveresults/*'
      createPage(page)
    }
    if (page.path.match(/^\/calendar/)) {
      page.matchPath = '/calendar/*'
      createPage(page)
    }
  }
})
