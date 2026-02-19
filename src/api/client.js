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

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned invalid response");
  }

  if (!response.ok) {
    const errorMessage =
      data?.message ||
      data?.error ||
      "Something went wrong";

    throw new Error(errorMessage);
  }

  return data;
}
