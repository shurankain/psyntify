import { useState } from "react";
import AddPlantModal from "../components/AddPlantModal";
import EditPlantModal from "../components/EditPlantModal";
import PlantGrid from "../components/PlantGrid";
import { Plant } from "../types";


interface MyPlantsPageProps {
  plants: Plant[];
  onAddPlant: (formData: FormData) => Promise<void>;
  onUpdatePlant: (id: number, dto: { name: string; description: string }) => Promise<void>;
  onDeletePlant: (id: number) => Promise<void>;
  onLogout: () => void;
}

export default function MyPlantsPage({ plants, onAddPlant, onUpdatePlant, onDeletePlant, onLogout }: MyPlantsPageProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);

  return (
    <div className="flex h-screen p-4 gap-4">
      <div className="flex-grow bg-gray-100 rounded-lg overflow-y-auto">
        <PlantGrid plants={plants} onPlantClick={setEditingPlant} />
      </div>

      <div className={`flex flex-col items-center bg-gray-200 rounded-lg transition-all duration-300 ${isSidebarOpen ? "w-48 p-4" : "w-10 p-2"}`}>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className={`flex items-center justify-center transition-all duration-300 text-green-700 bg-green-100 hover:bg-green-200 ${isSidebarOpen ? "w-40 h-12 rounded-lg px-4 justify-between" : "w-12 h-12 rounded-full text-3xl"}`}
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <span className="flex items-center gap-2 text-lg font-medium">
              Menu <span className="text-2xl">🌼</span>
            </span>
          ) : (
            "🌱"
          )}
        </button>

        {isSidebarOpen && (
          <div className="flex flex-col items-center gap-4 w-full mt-6">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add Plant
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddPlantModal onClose={() => setModalOpen(false)} onAddPlant={onAddPlant} />
      )}

      {editingPlant && (
        <EditPlantModal
          plant={editingPlant}
          onClose={() => setEditingPlant(null)}
          onUpdate={onUpdatePlant}
          onDelete={onDeletePlant}
        />
      )}
    </div>
  );
}
