import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import PlantForm, { PlantFormValues } from "../components/PlantForm";
import PlantList from "../components/PlantList";
import { useAuth } from "../context/AuthContext";
import { Plant } from "../types";
import { useWallet } from "@solana/wallet-adapter-react";
import { createPlant } from "../actions/createPlant";

const Home: React.FC = () => {
  const { token, logout } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const wallet = useWallet();

  const loadPlants = async () => {
    try {
      const data: Plant[] = await fetchWithAuth("/plants", token!);
      setPlants(data);
    } catch (err) {
      console.error("Failed to load plants", err);
    }
  };

  const handleAddPlant = async ({ name, description, imageUrl }: PlantFormValues) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      alert("Connect wallet first");
      return;
    }

    try {
      // 1. Добавляем в Solana
      await createPlant(wallet as any, name, description, imageUrl);

      // 2. Дублируем в backend для отображения
      const newPlant: Plant = await fetchWithAuth("/plants", token!, {
        method: "POST",
        body: JSON.stringify({ name, description, imageUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setPlants((prev) => [...prev, newPlant]);
    } catch (err) {
      console.error("Failed to add plant", err);
      alert("Failed to create plant");
    }
  };

  const handleDelete = (deletedId: number) => {
    setPlants((prev) => prev.filter((p) => p.id !== deletedId));
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
        <PlantList plants={plants} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
