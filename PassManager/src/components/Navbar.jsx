import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-300 flex justify-around items-center px-4 h-14 text-white'>
      <div className="logo font-bold text-2xl">
        <span className='text-purple-800 font-extrabold border-2 border-white p-1'>P</span>
        <span>ass</span>
        <span className='bg-purple-800 p-2 rounded-full'>Manager</span>
      </div>
      <ul>
        <li className='flex gap-10'>
          <a className='hover:font-bold' href='#'>Home</a>
          <a className='hover:font-bold' href='#'>About</a>
          <a className='hover:font-bold' href='#'>Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
