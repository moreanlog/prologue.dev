import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import PostCard from "../../../components/postcard";


export default async function Tag({ params }) {
  const slug = params?.slug?.join("/");
  const filterPosts = allPosts.filter((post) => post.tags.includes(slug));
  if (!filterPosts || filterPosts == '') {
    notFound();
  }
  return (
    <>
     <h1 className="prose-2xl font-bold max-w-4xl pt-2 mx-auto"># {slug}</h1>
      <div className="mx-auto max-w-lg">
       
        {filterPosts
          .filter((post) => post.draft === false)
          .map((post) => (
            <article key={post._id} className="">
              <PostCard
                title={post.title}
                slug={post.slug}
                description={post.description}
                pubDate={post.pubDate}
                readingTime={post.readingTime.text}
              />
            </article>
          ))}
      </div>
    </>
  );
}
