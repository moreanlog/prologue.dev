import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"
import {MDXComponent} from "../../components/mdxcomponent"
import siteMetadata from "../../../data/sitemetadata"
import TableofContent from "../../components/toc"
import ScrollTopAndComment from "../../components/scroll"
import Comments from "../../components/comments"




async function getPageFromParams(params) {
  const slug = params?.slug?.join("/")
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({
  params,
}) {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title + " - " + siteMetadata.publishName,
    description: page.description,
    openGraph: {
      title: page.title + " - " + siteMetadata.publishName,
      description: page.description,
      url: "/" + page.slugAsParams,
      siteName: siteMetadata.siteName,
      images: [
        {
          url: `/og?title=${page.title}`,
        },
      ],
      locale: siteMetadata.language,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title + " - " + siteMetadata.publishName,
      description: page.description,
      creator: siteMetadata.twitter,
      siteId: siteMetadata.twitterid,
      creatorId: siteMetadata.twitterid,
      images:  `/og?title=${page.title}`,
    },
  }
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <><div className="relative xl:grid xl:grid-cols-8 gap-8 mx-auto max-w-5xl">
      <article className="col-span-6 py-4 prose mx-auto dark:prose-invert max-w-2xl">
        <h1 className="mb-2 py-4 leading-relaxed">{page.title}</h1>
        {page.description && (
          <p className="mt-4 text-slate-700 dark:text-slate-200">
            {page.description}
          </p>
        )}
        <hr className="py-2 pt-2" />
        <MDXComponent code={page.body.code} />
        <hr />
        <Comments />
      </article>
      <div className="col-span-2 mx-auto">
        <div className="sticky top-0 hidden xl:block pt-12">
          <p className="text-zinc-600 dark:text-zinc-300 py-4">On this page</p>
          {page.headings.map(heading => {
            return (
              <div key={heading.text}>
                <TableofContent heading={heading} />
              </div>
            )
          })}

        </div>
      </div>
    </div><ScrollTopAndComment /></>
  )
}