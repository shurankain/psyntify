import { Plant } from "../types";

interface PlantGridProps {
  plants: Plant[];
  onPlantClick?: (plant: Plant) => void;
}

export default function PlantGrid({ plants, onPlantClick }: PlantGridProps) {
  if (plants.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        No plants yet. 🌱
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4">
      {plants.map((plant) => (
        <div
          key={plant.id}
          className="bg-gray-100 flex items-center justify-center overflow-hidden h-60 border border-gray-300 cursor-pointer"
          onClick={() => onPlantClick?.(plant)}
        >
          {plant.imageType && plant.imageType.startsWith("image/") ? (
            <img
              src={`data:${plant.imageType};base64,${plant.base64Image}`}
              alt={plant.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-600 bg-gray-300">
              PDF
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
