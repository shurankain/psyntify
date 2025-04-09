import { deletePlant } from "../api/plants";

const PlantList = ({ plants, onDelete }) => {
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this plant?")) {
      try {
        await deletePlant(id);
        onDelete();
      } catch (err) {
        alert("Failed to delete plant");
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-4">
      {plants.map((plant) => (
        <div key={plant.id} className="p-4 border rounded shadow flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{plant.name}</h2>
            <p className="text-gray-600">{plant.description}</p>
          </div>
          <button
            onClick={() => handleDelete(plant.id)}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
