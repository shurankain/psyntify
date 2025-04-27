import { Plant } from "../types";

interface PlantGridProps {
  plants: Plant[];
}

export default function PlantGrid({ plants }: PlantGridProps) {
  if (plants.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        No plants yet. 🌱
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {plants.map((plant) => (
        <div key={plant.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          {plant.imageType.startsWith("image/") ? (
            <img
              src={`data:${plant.imageType};base64,${plant.base64Image}`}
              alt={plant.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-600">
              PDF
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
