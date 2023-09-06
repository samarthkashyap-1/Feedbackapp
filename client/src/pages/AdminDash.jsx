import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Teachers from "../components/Teachers";

const AdminDash = ({admincheck}) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 grid grid-cols-5 m-3 gap-3">
        <Sidebar admincheck={admincheck} />
        <Teachers />
      </div>
    </div>
  );
};

export default AdminDash;
