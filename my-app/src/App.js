import { useState } from "react";
import UsersList from "./components/UsersList";
import PostsList from "./components/PostsList";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="container py-4">

      {!selectedUser && (
        <UsersList onUserSelect={(user) => setSelectedUser(user)} />
      )}

      {selectedUser && (
        <>
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => setSelectedUser(null)}
          >
            ← Back
          </button>

          <h2 className="fw-bold mb-4">
            Posts by {selectedUser.name}
          </h2>

          <PostsList userId={selectedUser.id} />
        </>
      )}
    </div>
  );
}

export default App;
