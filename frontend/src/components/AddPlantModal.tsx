import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface AddPlantModalProps {
  onClose: () => void;
  onAddPlant: (formData: FormData) => Promise<void>;
}

export default function AddPlantModal({ onClose, onAddPlant }: AddPlantModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", file);

    try {
      setIsSubmitting(true);
      await onAddPlant(formData);
      onClose();
    } catch (err) {
      console.error("Failed to add plant", err);
      alert("Failed to add plant");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
          {/* Левая часть: зона выбора файла */}
          <label
            htmlFor="fileInput"
            className="w-2/3 bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-contain h-full w-full"
              />
            ) : (
              <span className="text-gray-500 text-lg">Click to choose an image</span>
            )}
          </label>

          <input
            id="fileInput"
            type="file"
            accept="image/jpeg,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Правая часть: форма */}
          <div className="w-1/3 p-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Plant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded h-32"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
