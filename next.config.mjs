import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/docs',
  unstable_shouldAddLocaleToLinks: true
})

export default withNextra({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  }
})
