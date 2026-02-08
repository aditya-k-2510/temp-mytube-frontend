import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useAuth } from "./auth/useAuth";

function App() {
  const { user, setUser, loading } = useAuth();
  const [authMode, setAuthMode] = useState("login"); // login | register

  if (loading) return <h2>Loading...</h2>;

  if (!user) {
    return (
      <div className="container">
        {authMode === "login" ? (
          <Login onSuccess={(u) => setUser(u)} />
        ) : (
          <Register onSuccess={() => setAuthMode("login")} />
        )}

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          {authMode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                className="link"
                onClick={() => setAuthMode("register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="link"
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    );
  }

  return <Home user={user} onLogout={() => setUser(null)} />;
}

export default App;
