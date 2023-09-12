import { allPosts } from "contentlayer/generated"
import PostsLayout from "../../bloglistlayout"
import { compareDesc } from 'date-fns'

const POSTS_PER_PAGE = 10

export async function generateStaticParams() {
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString() ,
  }))

  return paths

}

export default async function PostsPage(context) {
  const {
    params: { page },
  } = context
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.pubDate), new Date(b.pubDate))
  })
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return  <PostsLayout posts={posts} pagination={pagination} initialDisplayPosts={initialDisplayPosts} /> 
}
