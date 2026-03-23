import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import type { ReactNode } from 'react'
import { SharedFooter } from '../../components/SharedFooter'

import { Search } from 'nextra/components'

type LayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function DocsLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  const pageMap = await getPageMap(`/${locale}`)
  
  // Recursively add frontMatter to folders with an index, making them clickable Folder Pages
  const isZh = locale === 'zh'
  function processPageMap(map: any[]) {
    map.forEach(node => {
      // Translate the root Docs folder name
      if (node.name === 'docs') {
        node.title = isZh ? '文档' : 'Docs'
      }

      if (node.children) {
        const hasIndex = node.children.some((child: any) => child.name === 'index')
        if (hasIndex) {
          node.frontMatter = { title: node.title }
        }
        processPageMap(node.children)
      }
    })
  }
  processPageMap(pageMap)



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
      editLink={isZh ? '编辑此页' : 'Edit this page'}
      feedback={{ content: isZh ? '有问题？给我们反馈' : 'Question? Give us feedback' }}
      search={
        isZh ? (
          <Search
            placeholder="搜索文档..."
            emptyResult="未找到结果。"
            errorText="加载搜索索引失败。"
            loading="加载中…"
          />
        ) : (
          <Search />
        )
      }
      toc={{
        title: isZh ? '本页目录' : 'On This Page',
        backToTop: isZh ? '返回顶部' : 'Scroll to top'
      }}
      themeSwitch={{
        light: isZh ? '亮色' : 'Light',
        dark: isZh ? '暗色' : 'Dark',
        system: isZh ? '跟随系统' : 'System'
      }}
      copyPageButton={!isZh}
      docsRepositoryBase="https://github.com/utooland/site/tree/main"
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
