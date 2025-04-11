export const fetchWithAuth = async (
  url: string,
  token: string,
  options: RequestInit = {}
) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("API request failed");
  return res.json();
};
