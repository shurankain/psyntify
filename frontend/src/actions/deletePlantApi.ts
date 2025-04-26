import { fetchWithAuth } from "../api/fetchWithAuth";

export async function deletePlantApi(id: number, token: string) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080"}/plants/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete plant: ${res.statusText}`);
  }
}
