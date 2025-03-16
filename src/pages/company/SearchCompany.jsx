import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/ui/SearchCard.jsx";

function SearchCompany() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/data/companies`);
        if (!response.ok) throw new Error("Failed to fetch companies");

        const data = await response.json();
        setCompanies(Array.isArray(data) ? data : data.companies || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [API_BASE_URL]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setSearchTerm(searchTerm.trim());
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      <div className="mt-4 mb-10 flex items-center border rounded-lg p-2 w-3/5 mx-auto bg-white">
        <input
          type="text"
          placeholder="Search company..."
          className="w-full p-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-500 ml-2 cursor-pointer" />
      </div>

      <div className="ml-16 mr-16">
        <h1 className="text-xl font-bold">Select Company</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company, index) => (
                <SearchCard
                  key={index}
                  item={{ company }}
                  type="company"
                  onClick={() => navigate(`/companies/${company}`)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No companies found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCompany;
