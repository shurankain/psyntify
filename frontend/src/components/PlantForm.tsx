import React, { FormEvent, useState } from "react";
import { Plant } from "../types";

type PlantFormProps = {
  onSubmit: (plant: Omit<Plant, "id" | "ownerId">) => void;
};

const PlantForm: React.FC<PlantFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Plant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Species"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Plant
      </button>
    </form>
  );
};

export default PlantForm;
