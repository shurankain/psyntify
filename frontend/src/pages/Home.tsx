import React, { useEffect, useState } from "react";
import { Plant } from "../types";
import PlantList from "../components/PlantList";
import PlantForm from "../components/PlantForm";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/fetchWithAuth";

const Home: React.FC = () => {
  const { token } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const { logout } = useAuth();

  const loadPlants = async () => {
    try {
      const data: Plant[] = await fetchWithAuth("/api/plants/my", token!);
      setPlants(data);
    } catch (err) {
      console.error("Failed to load plants", err);
    }
  };

  const handleAddPlant = async (plantData: Omit<Plant, "id" | "ownerId">) => {
    try {
      const newPlant: Plant = await fetchWithAuth("/api/plants", token!, {
        method: "POST",
        body: JSON.stringify(plantData),
      });
      setPlants((prev) => [...prev, newPlant]);
    } catch (err) {
      console.error("Failed to add plant", err);
    }
  };

  useEffect(() => {
    if (token) {
      loadPlants();
    }
  }, [token]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Plants 🌿</h1>
      <button
        onClick={logout}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
      <PlantForm onSubmit={handleAddPlant} />
      <div className="mt-6">
        <PlantList plants={plants} />
      </div>
    </div>
  );
};

export default Home;
