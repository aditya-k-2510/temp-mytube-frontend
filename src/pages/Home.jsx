import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const fetchVideos = async (pageNumber) => {
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch(`/videos?page=${pageNumber}&limit=8`);
      setVideos(res.data.videos);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h2>Home</h2>

      {videos.length === 0 && <p>No videos available</p>}

      <div style={{ display: "grid", gap: "20px" }}>
        {videos.map((video) => (
          <div key={video._id} className="card">
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <h3>{video.title}</h3>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={video.channelAvatar}
                alt="channel avatar"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              />
              <span>{video.channelName}</span>
            </div>

            <p>{video.views} views</p>
            <p>{video.numberOfLikes} likes</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
