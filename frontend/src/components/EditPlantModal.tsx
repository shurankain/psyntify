import { ChangeEvent, FormEvent, useState } from "react";
import { Plant } from "../types";

interface EditPlantModalProps {
  plant: Plant;
  onClose: () => void;
  onUpdate: (id: number, data: { name: string; description: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function EditPlantModal({ plant, onClose, onUpdate, onDelete }: EditPlantModalProps) {
  const [name, setName] = useState(plant.name);
  const [description, setDescription] = useState(plant.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onUpdate(plant.id, { name, description });
      onClose();
    } catch (err) {
      console.error("Failed to update plant", err);
      alert("Failed to update plant");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this plant?");
    if (!confirmed) return;
    try {
      await onDelete(plant.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete plant", err);
      alert("Failed to delete plant");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 max-w-5xl h-4/5 rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ✖
        </button>

        <form onSubmit={handleSubmit} className="flex h-full">
          <div className="w-2/3 bg-gray-100 flex items-center justify-center overflow-hidden">
            {plant.imageType.startsWith("image/") ? (
              <img
                src={`data:${plant.imageType};base64,${plant.base64Image}`}
                alt={plant.name}
                className="object-contain h-full w-full"
              />
            ) : (
              <div className="text-gray-600">PDF</div>
            )}
          </div>

          <div className="w-1/3 p-4 flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <textarea
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              className="border p-2 rounded h-32"
              required
            />
            <div className="mt-auto flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isSubmitting ? "Saving..." : "Update"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}