import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import PostsLayout from "../../blog/bloglistlayout";

export default async function Tag(props) {
  const params = await props.params;
  const slug = params?.slug?.join("/");
  const filterPosts = allPosts.filter((post) => post.tags.includes(slug));
  if (!filterPosts || filterPosts == '') {
    notFound();
  }

  const initialDisplayPosts = filterPosts.slice(0, 10)
  return (
    <>
      <div className="mx-auto">
      <PostsLayout posts={filterPosts} initialDisplayPosts={initialDisplayPosts} /> 
      </div>
    </>
  );
}
