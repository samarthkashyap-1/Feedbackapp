import React from "react";
// import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

import TeachersList from "../components/TeachersList";
import TeacherDetails from "../components/admin/TeacherDetails";
import CreateTeacher from "../components/admin/CreateTeacher";
import DrawerNavigation from "../components/Sidebar";

const AdminDash = ({ admincheck }) => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  }


  return (
    <div className="h-screen flex flex-col">
      <Navbar handleClick={handleClick}/>

      <Sidebar toggle={toggle} handleclick={handleClick} />
      <div className="flex-1 grid grid-cols-5 m-3 gap-3 relative">
        {/* <TeachersList /> */}
        <TeacherDetails />
        {/* <CreateTeacher/> */}
      </div>
    </div>
  );
};

export default AdminDash;
