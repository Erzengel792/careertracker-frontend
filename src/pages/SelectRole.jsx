import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import studentImg from "../assets/student.png";
import graduateImg from "../assets/graduate.png";

function SelectRole() {
    const [role, setRole] = useState("");
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`${API_BASE_URL}/user/check-account-type`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.has_account_type) {
                navigate(data.redirect);
            }
        })
        .catch(error => console.error("Error checking account type:", error));
    }, [navigate, API_BASE_URL]);

    const handleSubmitRole = async () => {
      if (!agree || !role) {
          alert("Please select a role and accept the privacy policy.");
          return;
      }
  
      const token = localStorage.getItem("token");
      if (!token) {
          navigate("/login");
          return;
      }
  
      try {
          const payload = {
              account_type: role,  // ✅ ตรวจสอบว่า role เป็น "student" หรือ "graduate"
              accept_policy: agree
          };
  
          console.log("🔹 Sending payload:", payload);  // ✅ Debug Payload ที่ส่งไป API
  
          const response = await fetch(`${API_BASE_URL}/user/set-account-type`, {
              method: "POST",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
          });
  
          const data = await response.json();
          console.log("🔹 Response from API:", data);  // ✅ Debug Response ที่ได้จาก API
  
          if (response.ok && data.redirect) {
              navigate(data.redirect);  // ✅ Redirect ไปที่ Form ที่เหมาะสม
          } else {
              alert(data.message || "An unexpected error occurred.");
          }
      } catch (error) {
          console.error("❌ Error:", error);
          alert("An error occurred. Please try again.");
      }
  };
  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEEDED] p-6">
            <h2 className="text-3xl md:text-3xl font-bold px-8 rounded-lg mt-1">
                Please select your account type
            </h2>

            <div className="flex flex-wrap justify-center gap-12 my-8">
                {[{ type: "student", img: studentImg }, { type: "graduate", img: graduateImg }].map((item) => (
                    <div
                        key={item.type}
                        className={`flex flex-col items-center p-12 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg ${
                            role === item.type ? "bg-[#b24e50e1]" : "bg-[#b24e50a4]"
                        }`}
                        onClick={() => setRole(item.type)}
                    >
                        <img src={item.img} alt={item.type} className="w-40 h-40 object-cover" />
                        <p className="mt-4 text-2xl font-semibold text-gray-800 capitalize">
                            {item.type}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex items-start gap-3 mb-8 max-w-lg">
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className="w-5 h-5 mt-1 cursor-pointer accent-[#b24e50] border-2 border-[#b24e50] rounded"
                />
                <p className="text-md md:text-lg text-gray-800 leading-snug">
                    I accept the website’s privacy policy and agree to share my personal
                    information.
                </p>
            </div>

            <button
                className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 ${
                    agree && role
                        ? "bg-white text-black cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!agree || !role}
                onClick={handleSubmitRole}
            >
                Continue
            </button>
        </div>
    );
}

export default SelectRole;
