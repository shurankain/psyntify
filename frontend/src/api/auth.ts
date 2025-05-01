const backend = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export async function loginUser(username: string, password: string): Promise<{ token: string }> {
  try {
    const res = await fetch(`${backend}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Login failed: ${res.status} ${res.statusText} - ${errorText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Login request failed:", err);
    throw new Error("Login request failed. Please try again.");
  }
}

export async function registerUser(username: string, email: string, password: string): Promise<void> {
  try {
    const res = await fetch(`${backend}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Registration failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
  } catch (err) {
    console.error("Registration request failed:", err);
    throw new Error("Registration request failed. Please try again.");
  }
}

export function logoutUser(): void {
  // Placeholder for any future logout logic (e.g., revoke token server-side)
  localStorage.removeItem("token");
}
