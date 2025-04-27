import PlantGrid from "../components/PlantGrid";
import { Plant } from "../types";
import AddPlantModal from "../components/AddPlantModal";
import { useState } from "react";

interface MyPlantsPageProps {
  plants: Plant[];
  onAddPlant: (formData: FormData) => Promise<void>;
  onLogout: () => void;
}

export default function MyPlantsPage({ plants, onAddPlant, onLogout }: MyPlantsPageProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-screen p-6 gap-6">
      <div className="flex-grow bg-gray-100 rounded-lg overflow-y-auto">
        <PlantGrid plants={plants} />
      </div>

      <div className="w-1/5 bg-gray-200 rounded-lg p-4 flex flex-col items-center gap-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Add Plant
        </button>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {isModalOpen && (
        <AddPlantModal
          onClose={() => setModalOpen(false)}
          onAddPlant={onAddPlant}
        />
      )}
    </div>
  );
}
