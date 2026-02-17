import { useState } from "react";
import { apiFetch } from "../api/client";

function Profile({ user, setUser }) {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [avatarFile, setAvatarFile] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [error, setError] = useState("");
  const [pwError, setPwError] = useState("");

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/users/update-details", {
        method: "PATCH",
        body: JSON.stringify({ fullName, email }),
      });

      setUser(res.data);
      alert("Profile updated");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwError("");
    setPwLoading(true);

    try {
      await apiFetch("/users/change-password", {
        method: "POST",
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      alert("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setPwError(err.message);
    } finally {
      setPwLoading(false);
    }
  };

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const res = await apiFetch("/users/avatar", {
        method: "PATCH",
        body: formData,
        headers: {},
      });

      setUser(res.data);
      setAvatarFile(null);
      alert("Avatar updated");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>My Profile</h2>

      <img
        src={user.avatar}
        alt="avatar"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "10px",
        }}
      />

      <p><strong>Username:</strong> {user.username}</p>

      {/* Update Avatar */}
      <form onSubmit={handleAvatarUpdate}>
        <input
          type="file"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
        <button className="primary" disabled={loading}>
          Update Avatar
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* Update Name & Email */}
      <form onSubmit={handleUpdateDetails}>
        <label>Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* Change Password */}
      <h3>Change Password</h3>
      <form onSubmit={handlePasswordChange}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="primary" disabled={pwLoading}>
          {pwLoading ? "Changing..." : "Change Password"}
        </button>

        {pwError && <p style={{ color: "red" }}>{pwError}</p>}
      </form>
    </div>
  );
}

export default Profile;
