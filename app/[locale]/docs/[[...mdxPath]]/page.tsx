import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../../../mdx-components'

const locales = ['en', 'zh']

export async function generateStaticParams() {
  const mdxPaths = await generateStaticParamsFor('mdxPath')()
  return locales.flatMap(locale =>
    mdxPaths.map(p => ({ locale, ...p }))
  )
}

type PageProps = {
  params: Promise<{ locale: string; mdxPath?: string[] }>
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.locale)
  return metadata
}

const Wrapper = useMDXComponents().wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  const { locale, mdxPath } = params
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode
  } = await importPage(mdxPath, locale)

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
