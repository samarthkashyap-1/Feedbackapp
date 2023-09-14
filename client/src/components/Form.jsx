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
  const subjects = [
    // array of subjects only
    "Select Subject",
    "Maths",
    "Science",
    "English",
    "Hindi",
    "Social Science",
  ];
  return (
    <div className="flex flex-col items-center rounded-lg bg-secondary justify-center flex-grow-1 py-4 text-black">
      <form
        className="grid grid-cols-2 gap-6 font-primary w-full p-10"
        action=""
      >
        <div className="flex flex-col gap-6">
          <div>
            <label className="font-semibold" htmlFor="student">
              Student Name
            </label>
            <select
              required
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-6 border-r-[24px] border-transparent focus:outline-none"
            >
              {options.map((option) => (
                <option className="text-lg" value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold" htmlFor="subject">
              Subject
            </label>
            <select
              required
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-6 border-r-[24px] border-transparent focus:outline-none"
            >
              {subjects.map((option) => (
                <option className="text-lg" value={option.id}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold" htmlFor="topics">
              Topics Covered
            </label>
            <input
              placeholder="Topics Covered"
              required
              type="text"
              className="w-full outline-none focus:outline-none p-3 rounded-lg text-sm "
            />
          </div>
          <div className="flex gap-6">
            <div>
              <label className="font-semibold" htmlFor="duration">
                Duration
              </label>
              <div className="flex gap-4">
                <input
                  required
                  placeholder="hours"
                  className="w-1/2 p-2 rounded-lg outline-none focus:outline-none"
                  type="number"
                />
                <input
                  placeholder="minutes"
                  className="w-1/2 p-2 rounded-lg outline-none focus:outline-none"
                  type="number"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold" htmlFor="test score">
                Test Score
              </label>
              <input
                placeholder=" Test Score"
                required
                className="w-full p-2 rounded-lg outline-none focus:outline-none"
                type="text"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="font-semibold" htmlFor="feedback">
            Feedback
          </label>
          <textarea
            required
            placeholder="Submit your feedback here"
            className="border-b-2 border-gray-400 w-full p-4 focus:outline-none bg-gray-50 rounded-lg"
            name=""
            id=""
            cols="30"
            rows="9"
          ></textarea>
          <button className="bg-sec_dark w-full rounded-md py-2 text-white font-semibold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
