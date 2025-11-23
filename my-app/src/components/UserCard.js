import { useState } from "react";

export default function UserCard({ user, onClick }) {
  const [following, setFollowing] = useState(false);

  const isPro = user.id % 2 === 0;
  const badgeText = isPro ? "PRO" : "TEAM";
  const badgeColor = isPro ? "#8b5cf6" : "#0ea5e9";

  function handleFollowClick(e) {
    e.stopPropagation();
    setFollowing((prev) => !prev);
  }

  return (
    <div className="col-12 col-md-4">
      <div
        className="card border-0 shadow-sm rounded-4 p-3 h-100"
        style={{
          cursor: "pointer",
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(244,114,182,0.08))",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 16px 35px rgba(15,23,42,0.20)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 6px 18px rgba(15,23,42,0.12)";
        }}
      >
        {/* User photo + name */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <img
              src={`https://i.pravatar.cc/100?img=${user.id}`}
              className="rounded-circle me-3"
              width="52"
              height="52"
              alt={`Avatar of ${user.name}`}
              style={{
                border: "2px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 10px rgba(15,23,42,0.25)",
              }}
            />
            <div>
              <h5 className="fw-bold mb-1">{user.name}</h5>
              <p className="text-muted small mb-0">{user.email}</p>
            </div>
          </div>

          <span
            className="badge text-white small"
            style={{
              backgroundColor: badgeColor,
              borderRadius: "999px",
              padding: "6px 10px",
              fontWeight: 600,
            }}
          >
            {badgeText}
          </span>
        </div>

        {/* Company + City */}
        <div className="mb-3 small text-muted">
          {user.company?.name && (
            <div>
              <strong>Company:</strong> {user.company.name}
            </div>
          )}
          {user.address?.city && (
            <div>
              <strong>City:</strong> {user.address.city}
            </div>
          )}
        </div>

        {/* Follow + Posts */}
        <div className="d-flex gap-2 mt-auto">
          <button
            className={
              "btn btn-sm w-50 " +
              (following ? "btn-light text-primary" : "btn-primary")
            }
            style={{ borderRadius: "999px", fontWeight: 600 }}
            onClick={handleFollowClick}
          >
            {following ? "Following" : "Follow"}
          </button>

          <button
            className="btn btn-sm btn-outline-dark w-50"
            style={{ borderRadius: "999px", fontWeight: 500 }}
          >
            View Posts →
          </button>
        </div>
      </div>
    </div>
  );
}
