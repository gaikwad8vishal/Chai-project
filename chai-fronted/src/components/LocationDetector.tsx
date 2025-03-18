import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

const UserLocation = () => {
  const [location, setLocation] = useState<string | null>(null);

  const fetchAndSendLocation = async () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude); // ✅ Debug

        try {
          const response = await axios.post("http://localhost:3000/save-location", {
            latitude,
            longitude,
          });

          console.log("Server Response:", response.data);
          setLocation(response.data.city);
        } catch (error: any) {
          console.error("Axios Error:", error.response?.data || error.message);

        }
      },
    );
  };

  useEffect(() => {
    fetchAndSendLocation();
  }, []);

  return (
    <div className="">
  <h2 className="text-sm font-semibold">Deliver to</h2>
  <div className="flex items-center gap-1"> 
    <FaMapMarkerAlt className="text-red-500" />
    {location ? (
      <p className="text-green-600">{location}</p>
    ) : (
      <p className="text-green-600">India!</p>
    )}
  </div>
</div>

  );
};

export default UserLocation;
