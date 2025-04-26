import { useState } from "react";

export default function PlantForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) formData.append("file", file);

    await onSubmit(formData);

    setName("");
    setDescription("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        placeholder="Plant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      />
      <input
        type="file"
        accept="image/jpeg,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border border-gray-300 rounded p-2"
      />
      {file && file.type.startsWith("image/") && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="mt-2 max-h-48 rounded"
        />
      )}
      {file && file.type === "application/pdf" && (
        <p className="mt-2 text-sm text-gray-500">📄 PDF file selected</p>
      )}
      <button
        type="submit"
        className="bg-green-500 text-white rounded p-2 hover:bg-green-600 w-full"
      >
        Create Plant
      </button>
    </form>
  );
}
