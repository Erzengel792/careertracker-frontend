import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import InfoCard from "../../src/components/ui/InfoCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [graduatesRes, studentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/data/graduate-data`),
          fetch(`${API_BASE_URL}/data/student-data`)
        ]);

        if (!graduatesRes.ok || !studentsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const graduatesData = await graduatesRes.json();
        const studentsData = await studentsRes.json();

        setGraduates(graduatesData);
        setStudents(studentsData);
        // รวมข้อมูลไว้ใน state เดียวเพื่อแสดงผลร่วมกันได้
        setData([...graduatesData, ...studentsData]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  // Handler for logout: remove token and navigate to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };


   // ใช้ key แบบ flat ตาม API (career_position, career_company)
   const filteredResults = data.filter((item) =>
    (item.faculty?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.major?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.career_position?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.career_company?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      {/* Header with Logout button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-4 mb-10 flex items-center border rounded-lg p-2 w-3/5 mx-auto bg-white">
        <input
          type="text"
          placeholder="Search Career..."
          className="w-full p-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-500 ml-2 cursor-pointer" />
      </div>

      {/* Display Results */}
      <div className="sm:ml-8 sm:mr-8 md:ml-16 md:mr-16 lg:ml-16 lg:mr-16 xl:ml-16 xl:mr-16">
        <h1 className="text-xl font-bold mb-4">Search Results</h1>
        {loading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">Error: {error}</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => (
                <InfoCard key={item.studentId || index} item={item} />
              ))
            ) : (
              <div className="flex justify-center items-center w-full col-span-3">
                <p className="text-gray-500 text-lg">No results found. Please enter a search term.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
