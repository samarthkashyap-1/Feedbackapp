import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TeachersList = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Sumit Vyas",
      email: "teacher1@gmail.com",
    },
    {
      id: 2,
      name: "Amit Jaiswal",
      email: "teacher2@gmail.com",
    },
    {
      id: 3,
      name: "Sasuke Uchiha",
      email: "teacher2@gmail.com",
    },
    {
      id: 4,
      name: "Jiraya",
      email: "teacher2@gmail.com",
    },
    {
      id: 5,
      name: "Tsunade",
      email: "teacher2@gmail.com",
    },
    {
      id: 6,
      name: "Teacher 6",
      email: "teacher2@gmail.com",
    },
  ]);

  return (
    <div className=" bg-primary col-span-5 p-6 ">
      <div className="flex justify-between">
        <h1 className="text-6xl font-bold">Teachers</h1>
        <button className=" px-4 py-2 bg-sec_dark text-white rounded-md">
          Add Teacher
        </button>
      </div>
      <div className="grid grid-cols-4 mt-4 gap-4">
        {teachers.map((teacher) => (
          <Link to={`/admin/teachers/${teacher.id}`}>
            <div className=" aspect-[2/1] px-8 py-4 flex border-2 border-sec_dark rounded-md cursor-pointer hover:scale-[106%] transition-all duration-500 ease-in-out hover:bg-sec_dark hover:text-white hover:shadow-md">
              <div className="grid place-content-center p-4">
                <div
                  className="h-20 aspect-square rounded-full object-cover grid place-content-center text-5xl border-2"
                  alt=""
                >
                  {teacher.name[0]}
                </div>
              </div>
              <div className=" flex-grow break-words text-ellipsis overflow-hidden gap-2 p-2 justify-center flex-col flex">
                <h2 className="text-xl  ">{teacher.name}</h2>
                <p className="text-sm">{teacher.email}</p>
                <p className="text-sm">Students: 10</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;
