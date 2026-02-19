import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api/client";

function VideoDetail() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch(`/videos/${id}`);
      setVideo(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async () => {
    setLikeLoading(true);

    try {
      await apiFetch(`/likes/toggle/v/${id}`, {
        method: "POST",
      });

      // Refetch updated video data
      fetchVideo();
    } catch (err) {
      alert(err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) return <p>Loading video...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="container">
      <img
        src={video.thumbnail}
        alt={video.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <h2>{video.title}</h2>

      <p>{video.views} views</p>
      <p>{video.likesCount} likes</p>

      <button
        onClick={handleLikeToggle}
        disabled={likeLoading}
        style={{
          padding: "8px 12px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        {likeLoading ? "Processing..." : "Like / Unlike"}
      </button>

      <hr />

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={video.owner.avatar}
          alt="owner avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />

        <div>
          <strong>{video.owner.username}</strong>
          <p>{video.owner.subscriberCount} subscribers</p>
        </div>
      </div>

      <hr />

      <p>{video.description}</p>
    </div>
  );
}

export default VideoDetail;
