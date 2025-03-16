import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoCard from "../../components/ui/InfoCard.jsx";
import { Search, ArrowLeft } from "lucide-react";

function CompanyMembers() {
  const { company } = useParams();
  const navigate = useNavigate();
  const [searchCompany, setSearchCompany] = useState(company || "");
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchGraduates = async () => {
      if (!searchCompany.trim()) return;
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/data/graduates-by-company?company=${encodeURIComponent(searchCompany)}`
        );
        if (!response.ok) throw new Error("Failed to fetch graduates");

        const data = await response.json();
        setGraduates(Array.isArray(data) ? data : data.graduates || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGraduates();
  }, [searchCompany, API_BASE_URL]);

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      <div className="relative flex items-center mt-4 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 text-gray-700 hover:text-black transition-colors duration-300 flex items-center gap-2 ml-6 cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="w-full flex justify-center">
          <div className="w-3/5 flex items-center border rounded-lg p-2 bg-white">
            <input
              type="text"
              placeholder="Search company..."
              className="w-full p-2 outline-none"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
            />
            <Search className="text-gray-500 ml-2 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="sm:mx-8 md:mx-16 lg:mx-16 xl:mx-16">
        <h1 className="text-xl font-bold">
          {searchCompany ? `Graduates in ${searchCompany}` : "Search for a company"}
        </h1>

        {loading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">Error: {error}</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
            {graduates.length > 0 ? (
              graduates.map((item) => <InfoCard key={item.studentId} item={item} />)
            ) : (
              <p className="text-gray-500 text-lg text-center col-span-3">No graduates found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyMembers;
