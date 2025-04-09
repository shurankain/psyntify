import { useEffect, useState } from "react";
import { fetchPlants } from "../api/plants";
import PlantList from "../components/PlantList";
import PlantForm from "../components/PlantForm";

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlants = () => {
    setLoading(true);
    fetchPlants()
      .then(setPlants)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPlants();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">🌿 Add a Plant</h1>
      <PlantForm onSuccess={loadPlants} />
      <h2 className="text-2xl font-semibold mb-4">🌱 All Plants</h2>
      {loading ? <p>Loading...</p> : <PlantList plants={plants} />}
    </div>
  );
};

export default Home;
