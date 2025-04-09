const PlantList = ({ plants }) => {
  return (
    <div className="space-y-4">
      {plants.map((plant) => (
        <div key={plant.id} className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">{plant.name}</h2>
          <p className="text-gray-600">{plant.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
