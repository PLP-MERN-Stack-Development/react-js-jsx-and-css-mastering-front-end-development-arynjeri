import { useEffect, useState } from "react";

const Posts = ({ darkMode }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const POSTS_PER_PAGE = 10;

  // Fetch posts from API
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
        setHasMore(data.length > POSTS_PER_PAGE);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter posts by search
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, page * POSTS_PER_PAGE); // paginate

  // Load more posts
  const loadMore = () => {
    setPage((prev) => prev + 1);
    if (page * POSTS_PER_PAGE >= posts.length) setHasMore(false);
  };

  if (loading) return <p className="text-center py-4">Loading posts...</p>;
  if (error)
    return <p className="text-center text-red-500 py-4">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>

      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className={`w-full p-2 mb-4 border rounded ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
        }`}
      />

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.length === 0 ? (
          <p
            className={`col-span-full text-center ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No posts found
          </p>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`p-4 border rounded shadow hover:shadow-md transition ${
                darkMode
                  ? "border-gray-700 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            >
              <h3 className="font-bold mb-2">{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))
        )}
      </div>

      {/* Load more button */}
      {hasMore && filteredPosts.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
