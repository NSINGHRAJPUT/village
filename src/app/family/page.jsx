import axios from "axios";
import FamilyPage from "./Family.jsx";

async function fetchFamilies() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/getAllCasteFamilies"
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching family data:", error);
    return [];
  }
}

export default async function Page() {
  const familiesData = await fetchFamilies();
  return <FamilyPage families={familiesData} />;
}
