import React, { FormEvent, useState } from "react";

export type PlantFormValues = {
  name: string;
  description: string;
  imageUrl: string;
};

type PlantFormProps = {
  onSubmit: (plant: PlantFormValues) => void;
};

const PlantForm: React.FC<PlantFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, description, imageUrl });
    setName("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-700">Add a New Plant</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Plant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Image URL"
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Create Plant
      </button>
    </form>
  );
};

export default PlantForm;
