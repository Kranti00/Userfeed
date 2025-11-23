import { useEffect, useState, useRef, useMemo } from "react";

export default function PostCard({ post }) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const [showComments, setShowComments] = useState(false);

    // useRef to auto-scroll
    const commentsEndRef = useRef(null);

    // Load saved data
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
        const storedLikedState = JSON.parse(localStorage.getItem("likedState")) || {};
        const storedComments = JSON.parse(localStorage.getItem("comments")) || {};

        setLikes(storedLikes[post.id] || 0);
        setLiked(storedLikedState[post.id] || false);
        setComments(storedComments[post.id] || []);
    }, [post.id]);

    // Auto-scroll when comments change
    useEffect(() => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [comments]);

    // Memoized sorted comments
    const sortedComments = useMemo(() => {
        return [...comments].sort((a, b) => a.length - b.length);
    }, [comments]);

    function handleLike() {
        let newLikes = liked ? likes - 1 : likes + 1;
        if (newLikes < 0) newLikes = 0;

        setLiked(!liked);
        setLikes(newLikes);

        const storeLikes = JSON.parse(localStorage.getItem("likes")) || {};
        const storeLikedState = JSON.parse(localStorage.getItem("likedState")) || {};
        storeLikes[post.id] = newLikes;
        storeLikedState[post.id] = !liked;

        localStorage.setItem("likes", JSON.stringify(storeLikes));
        localStorage.setItem("likedState", JSON.stringify(storeLikedState));
    }

    function handleComment() {
        if (!input.trim()) return;

        const newList = [...comments, input];
        setComments(newList);
        setInput("");

        const store = JSON.parse(localStorage.getItem("comments")) || {};
        store[post.id] = newList;
        localStorage.setItem("comments", JSON.stringify(store));
    }

    function deleteComment(index) {
        const newList = comments.filter((_, i) => i !== index);
        setComments(newList);

        const store = JSON.parse(localStorage.getItem("comments")) || {};
        store[post.id] = newList;
        localStorage.setItem("comments", JSON.stringify(store));
    }

    return (
        <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column">

                {/* Thumbnail */}
                <div className="ratio ratio-4x3">
                    <img
                        src={`https://picsum.photos/seed/${post.id}/600/400`}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt="thumbnail"
                    />
                </div>

                <div className="card-body">
                    <h5
    className="fw-bold text-capitalize mb-2"
    style={{
        display: "-webkit-box",
        WebkitLineClamp: "1",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        minHeight: "28px",
    }}
>
    {post.title}
</h5>

                    <p className="text-muted mb-2">{post.body}</p>

                    {/* Like + show comments */}
                    <div className="d-flex gap-2 mt-2">
                        <button className="btn btn-light border" onClick={handleLike}>
                            {liked ? "❤️" : "🤍"} {likes}
                        </button>

                        <button
                            className="btn btn-light border"
                            onClick={() => setShowComments(!showComments)}
                        >
                            💬 Comments ({comments.length})
                        </button>
                    </div>

                    {/* Comments ui */}
                    {showComments && (
                        <div className="mt-3">

                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Write a comment…"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <button className="btn btn-primary w-100 mb-3" onClick={handleComment}>
                                Add Comment
                            </button>

                            <div
                                style={{
                                    maxHeight: "120px",
                                    overflowY: "auto",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    background: "#fafafa"
                                }}
                            >
                                {sortedComments.map((c, i) => (
                                    <div
                                        key={i}
                                        className="d-flex justify-content-between align-items-center mb-2"
                                    >
                                        <span>💬 {c}</span>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteComment(i)}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}

                                {/* auto scroll reference */}
                                <div ref={commentsEndRef}></div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-white">
                    <div className="d-flex align-items-center gap-2">
                        <img
                            src={`https://i.pravatar.cc/40?img=${post.id}`}
                            className="rounded-circle"
                            width="32"
                            height="32"
                            alt="avatar"
                        />
                        <span className="fw-semibold">Designer {post.id}</span>
                    </div>

                    <div className="d-flex align-items-center gap-3 text-muted">
                        <span>❤️ {likes}</span>
                        <span>👁 {post.id * 200}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
