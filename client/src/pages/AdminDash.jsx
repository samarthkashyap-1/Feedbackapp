import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";

const AdminDash = ({admincheck}) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 grid grid-cols-5 m-3 gap-3">
        <Sidebar admincheck={admincheck} />
        <Feedback />
      </div>
    </div>
  );
};

export default AdminDash;
