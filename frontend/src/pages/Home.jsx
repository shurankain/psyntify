import { useEffect, useState } from "react";
import { fetchPlants } from "../api/plants";
import PlantList from "../components/PlantList";

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants()
      .then(setPlants)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🌱 Psyntify Plant List</h1>
      {loading ? <p>Loading...</p> : <PlantList plants={plants} />}
    </div>
  );
};

export default Home;
