import { useState } from "react";
import { apiFetch } from "../api/client";

function Register({ onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("avatar", avatar);
      if (coverImage) formData.append("coverImage", coverImage);

      await apiFetch("/users/register", {
        method: "POST",
        body: formData,
        headers: {}, // IMPORTANT
      });

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} /> {/* files is an array, we allow only 1 */}
        <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />

        <button className="primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </>
  );
}

export default Register;
