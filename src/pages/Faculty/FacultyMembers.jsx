import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoCard from "../../components/ui/InfoCard.jsx";
import { Search, ArrowLeft } from "lucide-react";

function FacultyMembers() {
  const { faculty } = useParams();
  const navigate = useNavigate();
  const [searchFaculty, setSearchFaculty] = useState(faculty || "");
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchGraduates = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/data/graduates?faculty=${encodeURIComponent(searchFaculty)}`
        );
        if (response.status === 404) {
          setGraduates([]);
          throw new Error("No graduates found for this faculty.");
        }
        if (!response.ok) {
          throw new Error(`Failed to fetch graduates: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setGraduates(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      if (searchFaculty) fetchGraduates();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchFaculty, API_BASE_URL]);

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      <div className="relative flex items-center mt-4 mb-10">
        <div className="absolute left-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-black transition-colors duration-300 flex items-center gap-2 ml-6 cursor-pointer sm:ml-4 md:ml-6 lg:ml-8"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-3/5 flex items-center border rounded-lg p-2 bg-white">
            <input
              type="text"
              placeholder="Search faculty..."
              className="w-full p-2 outline-none"
              value={searchFaculty}
              onChange={(e) => setSearchFaculty(e.target.value)}
            />
            <Search className="text-gray-500 ml-2 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="sm:mx-8 md:mx-16 lg:mx-16 xl:mx-16">
        <h1 className="text-xl font-bold">
          {searchFaculty ? `Graduates in ${searchFaculty}` : "Search for a faculty"}
        </h1>
        
        {loading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
            {graduates.length > 0 ? (
              graduates.map((item, index) => <InfoCard key={item.studentId || index} item={item} />)
            ) : (
              <div className="flex justify-center items-center w-full col-span-3">
                <p className="text-gray-500 text-lg">No graduates found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyMembers;
