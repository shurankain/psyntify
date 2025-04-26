import React, { useEffect, useState } from "react";
import { createPlantApi } from "../actions/createPlantApi";
import { fetchWithAuth } from "../api/fetchWithAuth";
import PlantForm from "../components/PlantForm";
import PlantList from "../components/PlantList";
import { useAuth } from "../context/AuthContext";
import { Plant } from "../types";

const Home: React.FC = () => {
  const { token, logout } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);

  const loadPlants = async () => {
    try {
      const data: Plant[] = await fetchWithAuth("/plants", token!);
      setPlants(data);
    } catch (err) {
      console.error("Failed to load plants", err);
    }
  };

  const handleAddPlant = async (formData: FormData) => {
    try {
      await createPlantApi(formData, token!);
      await loadPlants();
    } catch (err) {
      console.error("Failed to create plant", err);
      alert("Failed to create plant");
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
        <PlantList plants={plants} onDelete={(id) =>
          setPlants((prev) => prev.filter((p) => p.id !== id))
        } />
      </div>
    </div>
  );
};

export default Home;
