import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Sidebar = ({admincheck}) => {
  console.log(admincheck +" from login")
  const data = JSON.parse(localStorage.getItem("user"));

  const Navigate = useNavigate()
  return (
    <div className="col-span-1 p-2 bg-secondary rounded-lg drop-shadow-md">
      <div className=" bg-sec_dark   rounded-lg p-4">
        <div className=" flex p-2">
          <img
            className="flex w-1/4 h-1/3 rounded-full border-secondary border-4"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ09m0A12wo0-TOJylSMtL_4z_cg0ylhW2r_w&usqp=CAU"
            alt=""
          />
        </div>
        <div className="  px-2">
          <p className="font-bold text-lg">Utkarsh Maurya</p>
          <p className="text-xs font-medium">utkarshmaurya@123.com</p>
        </div>
      </div>
      <div className="p-4 mt-2 flex flex-col h-[70%] gap-3 font-bold">
        {data.email == "admin@gmail.com"? (
          <>
            <div className=" cursor-pointer">
              <p className="text-lg  hover:bg-white hover:text-sec_dark transition-colors duration-300 py-2 rounded-lg px-1">
                Teachers
              </p>
            </div>
            <hr className="border-black" />{" "}
          </>
        ) : (
          <>
            <div className="cursor-pointer">
              <p className="text-lg  hover:bg-white hover:text-sec_dark transition-colors duration-300 py-2 rounded-lg px-1">
                Feedback
              </p>
            </div>
            <hr className=" border-black" />
          </>
        )}
        <div className="mt-auto">
          <button onClick={()=>{Navigate("/")
        localStorage.clear()} }className="w-fit rounded-md bg-sec_dark p-2 font-semibold text-lg text-white hover:bg-white hover:text-sec_dark transition-colors duration-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
