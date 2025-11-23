import { useState, useEffect } from "react";
import PostCard from "./PostCard";

export default function PostsList({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 9; 

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const data = await res.json();
        setPosts(data);
        setCurrentPage(1);
      } catch (err) {
        setError("Failed to load posts");
      }
      setLoading(false);
    }
    fetchPosts();
  }, [userId]);

  if (loading)
    return <div className="text-center fs-4 fw-bold">Loading…</div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container">

      <div className="row g-4">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* PAGINATION */}
      <nav className="mt-5">
        <ul className="pagination justify-content-center">

          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link px-4 py-2" onClick={() => goToPage(currentPage - 1)}>
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
              <button className="page-link px-4 py-2" onClick={() => goToPage(page)}>
                {page}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link px-4 py-2" onClick={() => goToPage(currentPage + 1)}>
              Next
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
}
