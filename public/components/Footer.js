import React from 'react'

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (

        <nav className='bg-green-500 text-white flex flex-col sm:flex-row justify-center sm:justify-around items-center py-3 gap-2 sm:gap-0'>

            <div className="logo font-bold text-lg sm:text-2xl flex gap-2 items-center">

                <span>
                    <img className="w-7 sm:w-8" src="icons/coffee.png" alt="" />
                </span>

                <div>
                    <span className='text-white'>Get</span>
                    <span className='text-green-950'>Me</span>
                    <span className='text-white'>A</span>
                    <span className='bg-white text-green-950 p-1 rounded-2xl border border-black'>
                        Coffee
                    </span>
                </div>

            </div>

            <div className='text-sm sm:text-base text-center px-2'>
                Copyright &copy; {currentYear} - All rights reserved
            </div>

        </nav>
    )
}

export default Footer