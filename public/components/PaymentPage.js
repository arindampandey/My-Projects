"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchpayments, fetchuser, initiate } from '@/actions/useractions'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams } from 'next/navigation'

const PaymentPage = ({ username }) => {

    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })

    const [currentuser, setcurrentUser] = useState(null)
    const [payments, setpayments] = useState([])
    const [loading, setLoading] = useState(true)

    const searchParams = useSearchParams()

    useEffect(() => {

        if (!username) {
            setLoading(false)
            return
        }

        getdata()

    }, [username])

    useEffect(() => {

        if (searchParams.get("paymentdone") === "true") {

            toast.success('Payment Successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
                transition: Slide,
            })
        }

    }, [searchParams])

    const handlechange = (e) => {

        setpaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })
    }

    const getdata = async () => {

        try {

            setLoading(true)

            const u = await fetchuser(username)

            const dbpayments = await fetchpayments(username)

            setcurrentUser(u)

            setpayments(dbpayments || [])

        }

        catch (error) {

            console.log(error)

            toast.error("Failed to load profile")

        }

        finally {

            setLoading(false)
        }
    }

    const pay = async (amount) => {

        if (!currentuser?.razorpayid) {

            toast.error("Razorpay not configured by user")

            return
        }

        if (!paymentform.name.trim()) {

            toast.error("Please enter your name")

            return
        }

        if (!paymentform.message.trim()) {

            toast.error("Please enter a message")

            return
        }

        if (!amount || amount < 1) {

            toast.error("Enter valid amount")

            return
        }

        try {

            const a = await initiate(
                amount,
                username,
                paymentform
            )

            const options = {

                key: currentuser.razorpayid,

                amount: a.amount,

                currency: "INR",

                name: "GetMeACoffee",

                description: "Support Payment",

                order_id: a.id,

                callback_url: "http://localhost:3000/api/razorpay",

                prefill: {
                    name: paymentform.name,
                },

                theme: {
                    color: "#16a34a",
                },
            }

            const rzp = new window.Razorpay(options)

            rzp.open()

        }

        catch (error) {

            console.log(error)

            toast.error(error.message || "Payment could not be started")
        }
    }

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center text-white text-2xl">
                Loading Profile...
            </div>
        )
    }

    if (!currentuser && !loading) {

        return (

            <div className="min-h-screen flex items-center justify-center text-white text-2xl">
                User Not Found
            </div>
        )
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

            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className='cover w-full relative'>

                <img
                    className='object-cover w-full h-52 sm:h-72 md:h-100 border-b border-slate-300'
                    src={
                        currentuser?.coverpic ||
                        "https://placehold.co/1200x400"
                    }
                    alt="cover"
                />

                <div className="profile-pic absolute -bottom-10 left-1/2 -translate-x-1/2">

                    <img
                        className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-white object-cover bg-black'
                        src={
                            currentuser?.profilepic ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="profile"
                    />

                </div>

            </div>

            <div className="info flex justify-center items-center mt-14 sm:mt-18 mb-10 flex-col gap-2 px-4">

                <div className='text-2xl sm:text-3xl font-bold text-white text-center break-all'>
                    @{username}
                </div>

                <div className='text-slate-300 text-center text-sm sm:text-base'>
                    Let's Help @{username} to get a Coffee !
                </div>

                <div className='text-slate-300 text-center text-sm sm:text-base'>
                    {payments.length} Payments Received . {currentuser.name} has raised ₹{payments.reduce((a, b) => a + b.amount, 0)}
                </div>

            </div>

            <div className="payments flex flex-col lg:flex-row gap-5 px-3 sm:px-8 lg:px-20 my-10">

                <div className="supporters w-full lg:w-1/2 bg-green-950 text-white rounded-2xl p-5 sm:p-8 border border-green-800 shadow-lg shadow-green-800">

                    <h2 className='font-bold text-2xl sm:text-3xl text-center'>
                        Top 10 <span className='text-green-500 text-3xl sm:text-4xl'>Supporters</span>
                    </h2>

                    <ul className='my-8 mx-1 sm:mx-5'>

                        {payments.length === 0 &&
                            <li className='text-center'>No Payments Yet</li>
                        }

                        {payments.slice(0, 10).map((p, i) => (

                            <li
                                key={i}
                                className='my-4 flex gap-2 items-center wrap-break-words'
                            >

                                <img
                                    className='w-10 h-10 rounded-full object-cover shrink-0'
                                    src="/icons/profile.png"
                                    alt=""
                                />

                                <span className='text-sm sm:text-base'>

                                    {p.name} donated{" "}

                                    <span className='font-bold'>
                                        ₹{p.amount}
                                    </span>

                                    {" "}with a message "{p.message}"

                                </span>

                            </li>

                        ))}

                    </ul>

                </div>

                <div className="makepayment w-full lg:w-1/2 bg-green-950 text-white rounded-2xl p-5 sm:p-8 border border-green-800 shadow-lg shadow-green-800">

                    <h2 className='font-bold text-2xl sm:text-3xl text-center'>
                        Make a <span className='text-green-500 text-3xl sm:text-4xl'>Payment</span>
                    </h2>

                    <div className="flex gap-4 mt-5 flex-col">

                        <input
                            onChange={handlechange}
                            name='name'
                            value={paymentform.name}
                            type="text"
                            className='w-full p-2 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none'
                            placeholder='Enter Name'
                        />

                        <input
                            onChange={handlechange}
                            name='message'
                            value={paymentform.message}
                            type="text"
                            className='w-full p-2 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none'
                            placeholder='Enter Message'
                        />

                        <input
                            onChange={handlechange}
                            name='amount'
                            value={paymentform.amount}
                            type="number"
                            className='w-full p-2 rounded-lg bg-green-800 border border-slate-200 hover:bg-green-700 outline-none'
                            placeholder='Enter Amount'
                        />

                        <button
                            onClick={() => pay(Number(paymentform.amount))}
                            type="button"
                            className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-bold text-sm px-4 py-2.5 text-center leading-5 rounded-lg border border-slate-200"
                        >
                            Pay
                        </button>

                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5'>

                        <button
                            type="button"
                            onClick={() => pay(10)}
                            className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br font-bold text-sm px-4 py-2.5 rounded-lg border border-slate-200"
                        >
                            Pay ₹10
                        </button>

                        <button
                            type="button"
                            onClick={() => pay(20)}
                            className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br font-bold text-sm px-4 py-2.5 rounded-lg border border-slate-200"
                        >
                            Pay ₹20
                        </button>

                        <button
                            type="button"
                            onClick={() => pay(30)}
                            className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br font-bold text-sm px-4 py-2.5 rounded-lg border border-slate-200"
                        >
                            Pay ₹30
                        </button>

                    </div>

                </div>

            </div>

        </>
    )
}

export default PaymentPage