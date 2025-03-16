import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginSignup from '../pages/LoginSignup';
import SelectRole from '../pages/SelectRole';
import StudentForm from '../pages/StudentForm';
import GraduateForm from '../pages/GraduateForm';
import Dashboard from '../pages/Dashboard';
import InformationProfile from '../components/ui/InformationProfile';

import ProfileNavbar from '../components/ui/HomeNavbar';

import FacultySearch from '../pages/Faculty/SearchFaculty';
import FacultyMembers from '../pages/Faculty/FacultyMembers';
import CareerSearch from '../pages/career/SearchCareer'
import CareerMembers from '../pages/career/CareerMembers';
import CompanySearch from '../pages/company/SearchCompany'
import CompanyMembers from '../pages/company/CompanyMembers'


// Layout สำหรับ Navbar 
function ProfileLayout({ children }) {
  return (
    <div className="flex">
      <ProfileNavbar /> 
      <div className="flex-1">{children}</div> 
    </div>
  );
}


function AppRoutes() {
  return (
    <Routes>
      {/* ไม่มี Navbar */}
      <Route path="/" element={<LoginSignup />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/graduate-form" element={<GraduateForm />} />
      <Route path='/student-form' element={<StudentForm />} />



      {/* ใช้ ProfileNavbar */}
      <Route path="/dashboard" element={<ProfileLayout><Dashboard /></ProfileLayout>} />

      <Route path="/faculties" element={<ProfileLayout><FacultySearch /></ProfileLayout>} />
      <Route path="/faculties/:faculty" element={<ProfileLayout><FacultyMembers /></ProfileLayout>} />
      <Route path="/faculties/:faculty/members/:id" element={<ProfileLayout><InformationProfile /></ProfileLayout>} />

      <Route path="/careers" element={<ProfileLayout><CareerSearch /></ProfileLayout>} />
      <Route path="/careers/:career" element={<ProfileLayout><CareerMembers /></ProfileLayout>} />
      <Route path="/careers/:career/members/:id" element={<ProfileLayout><InformationProfile /></ProfileLayout>} />

      <Route path="/companies" element={<ProfileLayout><CompanySearch /></ProfileLayout>} />
      <Route path="/companies/:company" element={<ProfileLayout><CompanyMembers /></ProfileLayout>} />
      <Route path="/companies/:company/members/:id" element={<ProfileLayout><InformationProfile /></ProfileLayout>} />



    </Routes>
  );
}

export default AppRoutes;
