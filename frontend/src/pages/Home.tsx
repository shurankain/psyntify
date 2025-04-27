import React, { useEffect, useState } from "react";
import { createPlantApi } from "../actions/createPlantApi";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { useAuth } from "../context/AuthContext";
import { Plant } from "../types";
import MyPlantsPage from "./MyPlantsPage";

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
    <MyPlantsPage
      plants={plants}
      onAddPlant={handleAddPlant}
      onLogout={logout}
    />
  );
};

export default Home;
