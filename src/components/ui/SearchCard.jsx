import React from "react";

function SearchCard({ item, onClick, type }) {
  return (
    <div 
      className="p-4 bg-white border rounded-lg mb-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(item[type])} // ส่งค่า faculty, career หรือ company ตาม type
    >
      <p>
        <strong>
          {type === "career" ? "Career " : type === "faculty" ? "Faculty " : "Company "}
        :</strong> {item[type]}
      </p>
    </div>
  );
}

export default SearchCard;
