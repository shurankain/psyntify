import React from "react";
import { Plant } from "../types";

type PlantListProps = {
  plants: Plant[];
};

const PlantList: React.FC<PlantListProps> = ({ plants }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {plants.map((plant) => (
        <div key={plant.id} className="border p-4 rounded shadow-sm">
          <h2 className="text-lg font-semibold">{plant.name}</h2>
          <p className="text-gray-600 italic">{plant.species}</p>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
