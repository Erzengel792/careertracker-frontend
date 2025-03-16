import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import userProfile from "../../assets/userProfile.png";

const InformationProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item; // Receive data from navigation

  useEffect(() => {
    if (!item) {
      navigate(-1); // Redirect if item is not found
    }
  }, [item, navigate]);

  if (!item) {
    return <p className="text-center text-gray-500">Redirecting...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-8 bg-[#FEEDED]">
      <div className="w-full max-w-8xl p-8 bg-[#c47677] rounded-2xl shadow-xl">
        {/* Back Button */}
        <div className="flex items-center gap-6 mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-700 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <h2 className="text-xl font-bold">Information</h2>
        </div>

        {/* Information Sections */}
        <div className="bg-[#b24e50c0] p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
          {/* Left Column: Profile Header & Internship */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              {/* Profile Image */}
              <img
                src={item.profile_image ? item.profile_image.trim() : userProfile}
                alt={item.full_name}
                className="w-48 h-48 rounded-full ml-6 mt-4 object-cover"
                onError={(e) => (e.target.src = userProfile)}
              />
              <div className="ml-6">
                <p className="text-2xl font-bold mt-8">{item.full_name}</p>
                <label className="block text-sm mt-4">Faculty :</label>
                <input
                  type="text"
                  value={item.faculty || "N/A"}
                  readOnly
                  className="w-full bg-gray-50 p-2 rounded-lg"
                />
                <label className="block text-sm mt-2">Major :</label>
                <input
                  type="text"
                  value={item.major || "N/A"}
                  readOnly
                  className="mb-2 w-full bg-gray-50 p-2 rounded-lg"
                />
              </div>
            </div>

            {/* Internship Information */}
            <div className="bg-[#e2afb0f1] p-4 rounded-lg shadow-sm mt-6">
              <h3 className="text-center font-semibold mb-2">Internship Information</h3>
              <label className="block text-sm">Position :</label>
              <input
                type="text"
                value={item.internship_position || "N/A"}
                readOnly
                className="w-full bg-gray-50 p-2 rounded-lg"
              />
              <label className="block text-sm mt-2">Company :</label>
              <input
                type="text"
                value={item.internship_company || "N/A"}
                readOnly
                className="w-full bg-gray-50 p-2 rounded-lg"
              />
              <label className="block text-sm mt-2">Duration :</label>
              <input
                type="text"
                value={item.internship_duration || "N/A"}
                readOnly
                className="w-full bg-gray-50 p-2 rounded-lg"
              />
              <label className="block text-sm mt-2">Tasks :</label>
              <textarea
                value={item.internship_task || "N/A"}
                readOnly
                className="w-full bg-gray-50 p-2 rounded-lg resize-none"
              />
            </div>
          </div>

          {/* Right Column: Career & Academic Information */}
          <div className="flex-1 bg-[#e2afb0f1] p-4 rounded-lg shadow-sm">
            <h3 className="text-center font-semibold mb-2">Career Information</h3>
            <label className="block text-sm mt-2">Position :</label>
            <input
              type="text"
              value={item.career_position || "N/A"}
              readOnly
              className="w-full bg-gray-50 p-2 rounded-lg"
            />
            <label className="block text-sm mt-2">Company :</label>
            <input
              type="text"
              value={item.career_company || "N/A"}
              readOnly
              className="w-full bg-gray-50 p-2 rounded-lg"
            />
            <label className="block text-sm mt-2">Start Date :</label>
            <input
              type="text"
              value={item.date_of_employment || "N/A"}
              readOnly
              className="w-full bg-gray-50 p-2 rounded-lg"
            />
            <label className="block text-sm mt-2">Tasks :</label>
            <textarea
              value={item.career_task || "N/A"}
              readOnly
              className="w-full bg-gray-50 p-2 rounded-lg resize-none"
            />

            <h3 className="text-center font-semibold mt-7">Academic Information</h3>
            <label className="block text-sm">Extracurricular Activities :</label>
            <textarea
              value={item.extracurricular_activities || "N/A"}
              readOnly
              className="w-full bg-gray-50 p-2 rounded-lg resize-none"
            />
            <label className="block text-sm mt-1">Academic Projects & Research Work :</label>
            <textarea
              value={item.academic_projects || "N/A"}
              readOnly
              className="w-full bg-gray-50 p-2 rounded-lg resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationProfile;
