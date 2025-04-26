import React from "react";
import { useAuth } from "../context/AuthContext";
import { Plant } from "../types";

type PlantListProps = {
  plants: Plant[];
  onDeleted?: () => void;
};

const PlantList: React.FC<PlantListProps> = ({ plants, onDeleted }) => {
  const { user, token } = useAuth();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this plant?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/plants/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDeleted?.(); // просто сигнал перезагрузки
      } else {
        console.error("Failed to delete plant", await response.text());
      }
    } catch (err) {
      console.error("Error during deletion:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {plants.map((plant) => (
        <div key={plant.id} className="border p-4 rounded shadow-sm relative">
          <h2 className="text-lg font-semibold">{plant.name}</h2>
          <p className="text-gray-600 italic">{plant.description}</p>

          {user?.id === plant.ownerId && (
            <button
              onClick={() => handleDelete(plant.id)}
              className="absolute top-2 right-2 text-sm text-red-400 hover:text-red-600"
              title="Delete plant"
            >
              🗑️
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlantList;
