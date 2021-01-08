const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Vue State Validator',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/michaelolof/vue-state-validator',
      },
      {
        text: 'NPM',
        link: 'https://www.npmjs.com/package/vue-state-validator'
      },
    ],
    sidebar: [
      {
        title: 'Overview',
        path: '/overview',
        collapsable: false,
      },
      {
        title: 'Installation',
        path: '/installation',
        collapsable: false,
      },
      {
        title: 'Basic Principles',
        path: '/basic-principles',
        collapsable: false,
      },
      {
        title: 'Api Types',
        path: '/api-types',
        collapsable: false,
      },
      {
        title: 'Validators',
        path: '/validators',
        collapsable: false,
      },
      {
        title: 'Validation Rules',
        path: '/rules/',
        collapsable: false,
      },
      {
        title: 'Helper Directives',
        path: '/helper-directives',
        collapsable: false,
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
