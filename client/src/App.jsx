import TeacherDashboard from "./pages/TeacherDashboard"
import Login from "./pages/Login"
import AdminDash from "./pages/AdminDash"
import {Routes, Route , useLocation, useNavigate} from "react-router-dom"
import { useEffect, useLayoutEffect,useState } from "react";



function App() {
  const [admincheck, setadmincheck] = useState();
  const location = useLocation();

  const navigate = useNavigate()
  
  const data = JSON.parse(localStorage.getItem("user"));
  localStorage.getItem("user") ? console.log("user") : console.log("no user");

  useLayoutEffect(() => {
     
    if (localStorage.getItem("user")) {
      if (data.email == "admin@gmail.com" && data.password == "admin123") {
        setadmincheck(prev => true);
      } else {
        setadmincheck(prev => false);
      }
    }
  }, []);

const checkuser =()=>{
  // if (data == null) {
  //   redirect("/login")
  // }
    if (data?.email == "admin@gmail.com") {
     navigate("/admin");
    } else if (data?.email == "teacher@gmail.com") {
      navigate("/teacher");
    }
}
useEffect(() => {
  checkuser()
}, [location.pathname]);

 
  return (
    <>
      <h1 className="hidden sm:block md:block text-5xl text-center mt-96">
        This app is not supported on mobile devices. Please use a desktop
      </h1>
    <div className="w-screen h-screen sm:hidden md:hidden">
      
      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/teacher" element={<TeacherDashboard admincheck={admincheck} />} />
        <Route path="/admin" element={<AdminDash admincheck={admincheck} />} />
        
      </Routes>
    </div>
    </>
  );
}

export default App
