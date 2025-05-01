import { Plant } from "../types";
import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = "/my/plants";

export async function getMyPlants(token: string): Promise<Plant[]> {
  return await fetchWithAuth(BASE_URL, token);
}

export async function createPlant(formData: FormData, token: string): Promise<Plant> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080"}${BASE_URL}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create plant");
  }

  return await res.json();
}

export async function updatePlant(id: number, data: { name: string; description: string }, token: string): Promise<Plant> {
  return await fetchWithAuth(`${BASE_URL}/${id}`, token, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deletePlant(id: number, token: string): Promise<void> {
  await fetchWithAuth(`${BASE_URL}/${id}`, token, {
    method: "DELETE",
  });
}
