import React, { useEffect, useState } from "react";
import { createPlant, deletePlant, getMyPlants, updatePlant } from "../api/plants";
import { useAuth } from "../context/AuthContext";
import { Plant } from "../types";
import MyPlantsPage from "./MyPlantsPage";

const Home: React.FC = () => {
  const { token, logout } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);

  const loadPlants = async () => {
    try {
      const data: Plant[] = await getMyPlants(token!);
      setPlants(data);
    } catch (err) {
      console.error("Failed to load plants", err);
    }
  };

  const handleAddPlant = async (formData: FormData) => {
    try {
      await createPlant(formData, token!);
      await loadPlants();
    } catch (err) {
      console.error("Failed to create plant", err);
      alert("Failed to create plant");
    }
  };

  const handleUpdatePlant = async (
    plantId: number,
    updatedData: { name: string; description: string }
  ) => {
    try {
      await updatePlant(plantId, updatedData, token!);
      await loadPlants();
    } catch (err) {
      console.error("Failed to update plant", err);
      alert("Failed to update plant");
    }
  };

  const handleDeletePlant = async (plantId: number) => {
    try {
      await deletePlant(plantId, token!)
      await loadPlants();
    } catch (err) {
      console.error("Failed to delete plant", err);
      alert("Failed to delete plant");
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
      onDeletePlant={handleDeletePlant}
      onUpdatePlant={handleUpdatePlant}
    />
  );
};

export default Home;
