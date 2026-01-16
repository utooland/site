import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import type { ReactNode } from 'react'
import { SharedFooter } from '../../components/SharedFooter'

type LayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function DocsLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  const pageMap = await getPageMap(`/${locale}`)

  return (
    <Layout
      navbar={
        <Navbar
          logo={<span className="x:font-bold x:text-xl">Utoo</span>}
          logoLink="/"
        />
      }
      footer={
        <Footer>
          <SharedFooter />
        </Footer>
      }
      docsRepositoryBase="https://github.com/utooland/utoo/tree/main/content"
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      pageMap={pageMap}
      i18n={[
        { locale: 'en', name: 'English' },
        { locale: 'zh', name: '中文' }
      ]}
    >
      {children}
    </Layout>
  )
}
