"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { fetchuser, updateprofile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Slide } from 'react-toastify'

const Page = () => {

    const { data: session, update } = useSession()

    const router = useRouter()

    const [form, setform] = useState({})

    useEffect(() => {

        if (session) {
            getdata()
        }

        else if (session === null) {
            router.push('/login')
        }

    }, [session])

    const getdata = async () => {

        let u = await fetchuser(session.user.name)

        setform(u)
    }

    const handlechange = (e) => {

        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        await updateprofile(form, session.user.name)

        await update()

        toast.success('Profile Updated !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
            transition: Slide,
        })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />

            <div>

                <div className="min-h-screen text-white flex justify-center items-center px-3 sm:px-6 py-8 sm:py-10">

                    <div className="w-full max-w-3xl p-4 sm:p-8">

                        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-2">
                            Welcome to your <span className='text-green-500 text-3xl sm:text-5xl'>Dashboard</span>
                        </h1>

                        <p className="text-center text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                            Manage your profile and payment settings
                        </p>

                        <form className="space-y-4 sm:space-y-5" onSubmit={handlesubmit}>

                            <div>

                                <label className="block mb-2 font-semibold text-sm sm:text-base">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name || ""}
                                    onChange={handlechange}
                                    placeholder="Enter your name"
                                    className='w-full p-2 sm:p-3 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none text-sm sm:text-base'
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-sm sm:text-base">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email || ""}
                                    onChange={handlechange}
                                    placeholder="Enter your email"
                                    className='w-full p-2 sm:p-3 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none text-sm sm:text-base'
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-sm sm:text-base">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={form.username || ""}
                                    onChange={handlechange}
                                    placeholder="@username"
                                    className='w-full p-2 sm:p-3 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none text-sm sm:text-base'
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-sm sm:text-base">
                                    Profile Picture URL
                                </label>

                                <input
                                    type="text"
                                    name="profilepic"
                                    value={form.profilepic || ""}
                                    onChange={handlechange}
                                    placeholder="Paste profile picture link"
                                    className='w-full p-2 sm:p-3 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none text-sm sm:text-base'
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-sm sm:text-base">
                                    Cover Picture URL
                                </label>

                                <input
                                    type="text"
                                    name="coverpic"
                                    value={form.coverpic || ""}
                                    onChange={handlechange}
                                    placeholder="Paste cover picture link"
                                    className='w-full p-2 sm:p-3 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none text-sm sm:text-base'
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-sm sm:text-base">
                                    Razorpay Key ID
                                </label>

                                <input
                                    type="text"
                                    name="razorpayid"
                                    value={form.razorpayid || ""}
                                    onChange={handlechange}
                                    placeholder="rzp_test_xxxxx"
                                    className='w-full p-2 sm:p-3 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none text-sm sm:text-base'
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-sm sm:text-base">
                                    Razorpay Secret
                                </label>

                                <input
                                    type="password"
                                    name="razorpaysecret"
                                    value={form.razorpaysecret || ""}
                                    onChange={handlechange}
                                    placeholder="Enter Razorpay Secret"
                                    className='w-full p-2 sm:p-3 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none text-sm sm:text-base'
                                />

                            </div>

                            <div className="pt-2 sm:pt-4">

                                <button
                                    type="submit"
                                    className="w-full text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-bold text-sm sm:text-base px-4 py-3 text-center leading-5 rounded-lg border border-slate-200 transition-all duration-300"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Page