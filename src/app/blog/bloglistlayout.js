import PostCard from "../../components/postcard";
import Pagination from "../../components/pagination"
import TagsandSearch from "../../components/tagsandsearch";

const POSTS_PER_PAGE = 10;

const PostsLayout = ({ posts, pagination, initialDisplayPosts }) => {
  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : filteredBlogPosts;
  return (
    <>
          <div className="max-w-6xl">
            <TagsandSearch />
    <div className="max-w-xl mx-auto pt-12">
              {displayPosts.filter(post => post.draft=== false ).slice(0, POSTS_PER_PAGE).map((post) => (
        <article key={post._id} className="">
<PostCard title={post.title} slug={post.slug} description={post.description} pubDate={post.pubDate} readingTime={post.readingTime.text} tags={post.tags} />
        </article>
      ))}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}
      </div>
      </div>
    </>
  );
};
export default PostsLayout;
