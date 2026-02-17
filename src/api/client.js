const API_BASE = "http://localhost:3000/api/v1";

export async function apiFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json(); // backend now guarantees JSON

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
