const backend = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export const fetchWithAuth = async (
  url: string,
  token: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`${backend}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `API request failed: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  if (contentType?.includes("application/json")) {
    return res.json();
  } else {
    throw new Error("Unexpected content type: " + contentType);
  }
};
