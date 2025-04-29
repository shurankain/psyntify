const backend = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export const fetchWithAuth = async (
  url: string,
  token: string,
  options: RequestInit = {}
) => {
  const method = options.method ?? "GET";

  const headers: HeadersInit = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  if (method !== "GET") {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const res = await fetch(`${backend}${url}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `API request failed: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  if (res.status === 204 || !contentType) {
    return null;
  }

  if (contentType.includes("application/json")) {
    return res.json();
  } else {
    throw new Error("Unexpected content type: " + contentType);
  }
};
