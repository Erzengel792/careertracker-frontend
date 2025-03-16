import { User, Menu, ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';

function GraduateNavbar({ activeTab, onTabChange, onProfileImageChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setProfileFile(file);
      onProfileImageChange(file); // ส่งไฟล์ไปยัง GraduateForm
    }
  };

  // เพิ่มแท็บสำหรับ Graduate: personal, academic, internship และ career
  const tabs = [
    { key: 'personal', label: 'Personal Information' },
    { key: 'academic', label: 'Academic Information' },
    { key: 'internship', label: 'Internship Information' },
    { key: 'career', label: 'Career Information' }
  ];

  return (
    <div className="flex min-h-screen">
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} flex flex-col transition-all duration-300 bg-white shadow-lg`}>
        <div className="bg-[#b24e50] p-4 text-white flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex flex-col items-center w-full">
              <div className="text-lg font-bold mb-2">Welcome!</div>
              <div className="text-sm mb-2">Choose a profile picture</div>
              <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={24} className="text-gray-400" />
                )}
              </div>
              <label className="mt-3 text-sm font-bold cursor-pointer bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-all">
                Choose File
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all">
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          {tabs.map(({ key, label }) => (
            <div
              key={key}
              className={`border-b border-gray-300 py-4 px-4 hover:bg-gray-200 flex items-center cursor-pointer ${activeTab === key ? 'bg-gray-300' : ''}`}
              onClick={() => onTabChange(key)}
            >
              {isCollapsed ? <div className="w-full text-center">📌</div> : label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraduateNavbar;