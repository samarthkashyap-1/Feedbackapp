import React from 'react'

const Navbar = ({ handleClick}) => {
  return (
    <nav className='h-fit p-4 bg-secondary drop-shadow flex gap-6 '>
      <button onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
        <p className='text-2xl font-bold font-sans'>Dashboard</p>
    </nav>
    
  )
}

export default Navbar