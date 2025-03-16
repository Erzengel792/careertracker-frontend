import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/ui/SearchCard.jsx";

function SearchCareer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/data/careers`);
        if (!response.ok) {
          throw new Error("Failed to fetch careers");
        }
        const data = await response.json();
        setCareers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, [API_BASE_URL]);

  const filteredCareers = careers.filter((career) =>
    career.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      <div className="mt-4 mb-10 flex items-center border rounded-lg p-2 w-3/5 mx-auto bg-white">
        <input
          type="text"
          placeholder="Search career..."
          className="w-full p-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-500 ml-2 cursor-pointer" />
      </div>

      <div className="ml-16 mr-16">
        <h1 className="text-xl font-bold">Select Career</h1>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career, index) => (
                <SearchCard 
                  key={index} 
                  item={{ career }}
                  type="career" 
                  onClick={() => navigate(`/careers/${career}`)} 
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No careers found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCareer;
