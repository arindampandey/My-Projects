"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {

    const { data: session } = useSession()

    const [showdropdown, setshowdropdown] = useState(false)

    return (

        <nav className='bg-green-500 text-white flex flex-col sm:flex-row justify-between items-center py-2 sm:h-10 px-2'>

            <Link href={"/"}>

                <div className="logo font-bold text-lg sm:text-2xl flex gap-2 mx-2 items-center">

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

            </Link>

            <div className='flex flex-wrap justify-center gap-2 sm:gap-5 relative mx-2 mt-2 sm:mt-0'>

                {session &&
                    <>

                        <button
                            onClick={() => {
                                setshowdropdown(!showdropdown)
                            }}

                            onBlur={() => {
                                setTimeout(() => {
                                    setshowdropdown(false)
                                }, 100)
                            }}

                            type="button"

                            className="relative px-3 py-1 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-2xl shadow-inner group flex items-center gap-2 max-w-55 sm:max-w-none"
                        >

                            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>

                            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>

                            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>

                            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>

                            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>

                            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease flex items-center gap-2 truncate">

                                Account

                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${showdropdown ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 9-7 7-7-7"
                                    />

                                </svg>

                            </span>

                        </button>

                        <div
                            id="dropdown"

                            className={`z-10 ${showdropdown ? "block" : "hidden"} absolute right-0 top-10 bg-slate-200 text-black border rounded-lg shadow-lg w-44 mt-2`}
                        >

                            <ul
                                className="p-2 text-sm font-medium"
                                aria-labelledby="dropdownDefaultButton"
                            >

                                <li>

                                    <Link
                                        href="/dashboard"
                                        className="block w-full p-2 hover:bg-slate-300 rounded"
                                    >

                                        Dashboard

                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        href={`/${session.user.name}`}
                                        className="block w-full p-2 hover:bg-slate-300 rounded"
                                    >

                                        Your Page

                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        onClick={() => signOut()}
                                        href="#"
                                        className="block w-full p-2 hover:bg-slate-300 rounded"
                                    >

                                        Sign out

                                    </Link>

                                </li>

                            </ul>

                        </div>

                    </>
                }

                {session &&

                    <button
                        onClick={() => {
                            signOut()
                        }}

                        className="relative px-3 py-1 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-2xl shadow-inner group"
                    >

                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>

                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>

                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>

                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>

                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>

                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">

                            Logout

                        </span>

                    </button>

                }

                {!session &&

                    <Link href={"/login"}>

                        <button className="relative px-3 py-1 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-2xl shadow-inner group">

                            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>

                            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>

                            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>

                            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>

                            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>

                            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">

                                Login

                            </span>

                        </button>

                    </Link>

                }

            </div>

        </nav>
    )
}

export default Navbar