import axios from "axios";
import FamilyPage from "./Family.jsx";
import Footer from "../_components/Footer.jsx";

async function fetchFamilies() {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/api/getAllCasteFamilies`
    );
    
    if (response.status === 200) {
      // console.log("Family Data:", response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching family data:", error);
    return [];
  }
}

export default async function Page() {
  const familiesData = await fetchFamilies();
  return <>
    <FamilyPage families={familiesData} />
    <Footer />
  </>;
}
