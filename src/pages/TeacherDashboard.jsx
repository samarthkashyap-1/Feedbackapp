import React , {useState} from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";

const TeacherDashboard = ({admincheck}) => {
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
      setToggle(!toggle);
    };

  return (
    <div className="h-screen flex flex-col">
      <Navbar handleClick={handleClick} />

      <Sidebar toggle={toggle} handleclick={handleClick} />
      <div className="flex-1 grid grid-cols-5 m-3 gap-3">
        <Feedback />
      </div>
    </div>
  );
};

export default TeacherDashboard;
