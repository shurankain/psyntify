const API_URL = "http://localhost:8080/plants";

export const fetchPlants = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch plants");
  return await res.json();
};

export const createPlant = async (plant) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });
  if (!res.ok) throw new Error("Failed to create plant");
  return await res.json();
};
