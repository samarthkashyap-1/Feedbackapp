import React from "react";
import { Select, Option } from "@material-tailwind/react";

const Form = () => {
  const options = [
    // json array with student name and id
    {
      name: "Select Student",
      id: null,
    },
    {
      name: "Student 1",
      id: 1,
    },
    {
      name: "Student 2",
      id: 2,
    },
    {
      name: "Student 3",
      id: 3,
    },
  ];
  return (
      
    <div className="flex flex-col items-center bg-secondary justify-center flex-grow-1 py-4 text-black">

      <form  className=" w-1/3 flex flex-col gap-6" action="">
        <select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-6 border-r-[24px] border-transparent focus:outline-none">
          {options.map((option) => (
            <option className="text-lg" value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Submit your feedback here"
          className="border-b-2 border-gray-400 w-full p-4 focus:outline-none bg-gray-50"
          name=""
          id=""
          cols="30"
          rows="6"
          ></textarea>
        <button
        className="bg-sec_dark w-full rounded-md py-2 text-white font-semibold" 
        >Submit</button>
      </form>
        </div>
    
  );
};

export default Form;
