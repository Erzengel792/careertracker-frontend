import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/ui/SearchCard.jsx";

function FacultySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchFaculties = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/data/faculties`);
        if (!response.ok) {
          throw new Error("Failed to fetch faculties");
        }
        const data = await response.json();
        setFaculties(Array.isArray(data) ? data : data.faculties || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [API_BASE_URL]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearchTerm(searchTerm.trim());
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      <div className="mt-4 mb-10 flex items-center border rounded-lg p-2 w-3/5 mx-auto bg-white">
        <input
          type="text"
          placeholder="Search faculty..."
          className="w-full p-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-500 ml-2 cursor-pointer" />
      </div>

      <div className="ml-16 mr-16">
        <h1 className="text-xl font-bold">Select Faculty</h1>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {filteredFaculties.length > 0 ? (
              filteredFaculties.map((faculty, index) => (
                <SearchCard 
                  key={index} 
                  item={{ faculty }}
                  type="faculty" 
                  onClick={() => navigate(`/faculties/${faculty}`)} 
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No faculties found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultySearch;
