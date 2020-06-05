import { CreatePageArgs } from 'gatsby'

export default () => ({
  onCreatePage: async ({ page, actions }: CreatePageArgs) => {
    const { createPage } = actions
    if (page.path.match(/^\/live/)) {
      page.matchPath = '/live/*'
      createPage(page)
    }
  }
})
