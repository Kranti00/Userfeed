import { useEffect, useState, useMemo } from "react";
import UserCard from "./UserCard";
import { API_USERS } from "../api";

export default function UsersList({ onUserSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const USERS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(API_USERS);
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        setError("Failed to load users");
      }
      setLoading(false);
    }
    load();
  }, []);

  const filteredUsers = useMemo(() => {
    const value = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value)
    );
  }, [users, search]);

  
  useEffect(() => setCurrentPage(1), [search]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  if (loading)
    return <div className="text-center fs-4 fw-bold">Loading…</div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  
  const searchWrapperStyle = {
    maxWidth: "620px",
    borderRadius: "999px",
    overflow: "hidden",
    transition: "all 0.25s ease",
    transform: searchFocused ? "scale(1.03)" : "scale(1)",
    boxShadow: searchFocused
      ? "0 12px 30px rgba(15,23,42,0.20)"
      : "0 4px 16px rgba(15,23,42,0.10)",
    backgroundColor: "#ffffff",
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top left, #fdf2ff 0, #f5f7fa 45%, #eef5ff 100%)",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">

        <h2 className="fw-bold mb-3 text-center">Explore Creators</h2>
        <p className="text-muted mb-4 text-center">
          Browse creators and click to see their posts.
        </p>

        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-5">
          <div className="input-group" style={searchWrapperStyle}>
            <span className="input-group-text bg-white border-0 fs-4">🔍</span>
            <input
              type="text"
              className="form-control border-0 fs-5 py-3"
              placeholder="Search creators by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{ boxShadow: "none" }}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="row g-4">
          {paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => onUserSelect(user)}
            />
          ))}
        </div>

        
        <nav className="mt-5">
          <ul className="pagination justify-content-center">

            
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link px-4 py-2"
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

           
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""}`}
              >
                <button
                  className="page-link px-4 py-2"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link px-4 py-2"
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
}
