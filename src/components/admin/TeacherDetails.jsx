import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import close from "../../assets/close.svg";

const TeacherDetails = () => {
  const students = [
    {
      id: 1,
      name: "Student 1",
      email: "email1@gmail.com",
    },
    {
      id: 1,
      name: "Student 1",
      email: "email1@gmail.com",
    },
    {
      id: 1,
      name: "Student 1",
      email: "email1@gmail.com",
    },
    {
      id: 1,
      name: "Student 1",
      email: "email1@gmail.com",
    },
    {
      id: 1,
      name: "Student 1",
      email: "email1@gmail.com",
    },
    {
      id: 1,
      name: "Student 1",
      email: "email1@gmail.com",
    },
  ];
  const teacher = {
    id: 1,
    name: "Sumit Vyas",
    email: "sumitvyas@gmail.com",
    phone: "1234567890",
    password: "sumitvyas",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data :>> ", data);
  };
  const [Isopen, setIsopen] = React.useState(false);

  const toggle = () => {
    setIsopen(!Isopen);
  }


  return (
    <div className={`col-span-5 p-4 h-full bg-secondary rounded-md`}>
      <div className="flex justify-between items-center border-b-2 border-b-black py-4 px-10">
        <h1 className="text-4xl font-bold ">Teacher Details</h1>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Active
          </span>
        </label>
      </div>
      <div className="grid grid-cols-2 my-4 gap-6">
        <div className="px-10">
          <h1 className="text-2xl mb-6">Personal Details</h1>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-4"
            >
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  defaultValue={teacher.name}
                  {...register("name", {
                    required: "Name is required.",
                  })}
                  placeholder="Enter your name"
                  required
                  type="text"
                  id="name"
                  className="w-full outline-none focus:outline-none p-3 rounded-lg text-sm "
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  defaultValue={teacher.phone}
                  {...register("phone", {
                    required: "Phone Number is required.",
                  })}
                  placeholder="Enter phone number"
                  required
                  type="text"
                  className="w-full outline-none focus:outline-none p-3 rounded-lg text-sm "
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  defaultValue={teacher.email}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Email is not valid.",
                    },
                  })}
                  placeholder="Enter the email address"
                  required
                  type="text"
                  className="w-full outline-none focus:outline-none p-3 rounded-lg text-sm "
                />
                {errors.email && (
                  <p className="text-sm font-semibold text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  defaultValue={teacher.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Too small" },
                  })}
                  placeholder="Enter password"
                  required
                  type="text"
                  className="w-full outline-none focus:outline-none p-3 rounded-lg text-sm "
                />
                {errors.password && (
                  <p className="text-sm font-semibold text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="px-10">
          <div className="flex justify-between">
            <h1 className="text-2xl ">Assigned students</h1>
            <button
              className="px-2 py-1 bg-sec_dark text-white rounded-md text-xs"
              onClick={toggle}
            >
              Assign Student
            </button>
          </div>
          <div>
            <table className="w-full mt-6 bg-primary border-separate  border-spacing-2 rounded-md ">
              <thead className="">
                <tr className="text-left border-4 border-black">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  return (
                    <tr className="border-y border-gray-300">
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">
                        <button className="px-2 py-1 bg-sec_dark text-white rounded-md text-xs">
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-span-5 flex justify-center items-center mt-10">
        <button className=" px-4 py-2 bg-sec_dark text-white rounded-md">
          Submit Details
        </button>
      </div>

      {/* modal */}

      <div
        className={` left-[42%] top-[25%] bg-white ${
          Isopen ? " scale-100" : " scale-0"
        } p-10 z-50 absolute rounded-xl transition-all duration-200`}
      >
        <div className="flex">
          <button
            className=" scale-75 p-2 bg-sec_dark ml-auto text-white rounded-md "
            onClick={toggle}
          >
            <img src={close} alt="" />
          </button>
        </div>
        <div className="flex ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="studentname">
                Student Name
              </label>
              <input
                id="studentname"
                {...register("studentname", {
                  required: "Name is required.",
                })}
                placeholder="Enter Student name"
                required
                type="text"
                className="w-full outline-none focus:outline-none p-3 rounded-lg text-sm "
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="studentemail">
                Student Email
              </label>
              <input
              id="studentemail"
                placeholder="Enter Student email"
                required
                type="email"
                className="w-full outline-none focus:outline-none p-3 rounded-lg text-sm "
              />
            </div>
            <input
              type="submit"
              value="Submit Details"
              className=" px-4 py-2 bg-sec_dark text-white rounded-md"
            />
          </form>
        </div>
      </div>
      <div
        className={`${
          Isopen
            ? "absolute bottom-0 right-0 backdrop-blur top-0 left-0"
            : "hidden"
        }`}
      ></div>
    </div>
  );
};

export default TeacherDetails;
