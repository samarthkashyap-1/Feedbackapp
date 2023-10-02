import React from 'react'
import close from '../assets/close.svg'

const Sidebar = ( {toggle, handleclick} ) => {

  return (
    <>
      <div
        className={`${
          toggle ? "w-52" : "w-0"
        }  h-full overflow-hidden transition-all duration-300 absolute  bg-sec_dark text-white z-20 `}
      >
        <div className="flex p-4">
          <button className="ml-auto text-3xl" onClick={handleclick}>
            <img src={close} alt="" />
          </button>
        </div>
        <ul className="w-full h-full flex flex-col gap-8 p-10 ">
          <li>Home</li>
          <li>Teacher</li>
          <li>Feedback</li>
        </ul>
      </div>

      <div
        className={`${
          toggle
            ? "absolute w-screen h-screen z-10 backdrop-blur top-0 left-0"
            : "hidden"
        }`}
      ></div>
    </>
  );
}

export default Sidebar
