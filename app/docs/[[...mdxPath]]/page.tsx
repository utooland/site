import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../../mdx-components'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = useMDXComponents().wrapper

export default async function Page(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params
  const pageMap = await getPageMap('/docs')
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode
  } = await importPage(params.mdxPath)

  return (
    <Layout
      navbar={
        <Navbar
          logo={
            <div className="x:flex x:items-center x:gap-2">
              <span className="x:font-bold x:text-xl">Utoo</span>
              <span className="x:text-sm x:opacity-60">Docs</span>
            </div>
          }
          logoLink="/"
        />
      }
      footer={<Footer>MIT {new Date().getFullYear()} © Utoo.</Footer>}
      docsRepositoryBase="https://github.com/user/hello-utoo/tree/main/content"
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      pageMap={pageMap}
    >
      <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    </Layout>
  )
}
