import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from 'lucide-react';
import userProfile from "../../assets/userProfile.png";

function InfoCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/faculties/${item.faculty}/members/${item.student_id}`, { state: { item } });
  };

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-md text-center cursor-pointer hover:shadow-lg transition duration-300"
      onClick={handleClick}
    >
      <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
        {item.profile_image ? (
          <img 
            src={item.profile_image.trim()} 
            alt={item.full_name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = userProfile;
            }}
          />
        ) : (
          <User size={24} className="text-gray-400 mx-auto" />
        )}
      </div>
      <h2 className="text-lg font-semibold">{item.full_name}</h2>
      <p className="text-gray-600">{item.career_position || "N/A"} @ {item.career_company || "N/A"}</p>
      <p className="text-gray-800 font-medium">{item.faculty}</p>
    </div>
  );
}

export default InfoCard;
