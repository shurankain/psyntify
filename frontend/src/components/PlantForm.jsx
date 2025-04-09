import { useState } from "react";
import { createPlant } from "../api/plants";

const PlantForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await createPlant({ name, description });
      setName("");
      setDescription("");
      onSuccess(); // refresh the list
    } catch (err) {
      setError("Failed to create plant");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {submitting ? "Adding..." : "Add Plant"}
      </button>
    </form>
  );
};

export default PlantForm;
