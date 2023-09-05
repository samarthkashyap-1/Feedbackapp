import TeacherDashboard from "./pages/TeacherDashboard"
import Login from "./pages/Login"
import AdminDash from "./pages/AdminDash"
import {Routes, Route} from "react-router-dom"
import { useLayoutEffect,useState } from "react";



function App() {
  const [admincheck, setadmincheck] = useState();
  

  localStorage.getItem("user") ? console.log("user") : console.log("no user");

  useLayoutEffect(() => {
    if (localStorage.getItem("user")) {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data.email == "admin@gmail.com" && data.password == "admin123") {
        setadmincheck(true);
      } else {
        setadmincheck(false);
      }
    }
  }, []);
 
  return (
    <div className="w-screen h-screen ">
      
      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/teacher" element={<TeacherDashboard admincheck={admincheck} />} />
        <Route path="/admin" element={<AdminDash admincheck={admincheck} />} />
        
      </Routes>
    </div>
  );
}

export default App
