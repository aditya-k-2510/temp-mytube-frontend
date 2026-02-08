import { apiFetch } from "../api/client";

function Home({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      await apiFetch("/users/logout", { method: "POST" });
      onLogout();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Welcome, {user.fullName}</h2>
      <p>@{user.username}</p>

      <button className="primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
