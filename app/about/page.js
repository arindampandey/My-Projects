"use client"
import React from 'react'
import Link from 'next/link'

const AboutPage = () => {

    return (
        <>
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#166534_100%)]"></div>

            <div className="min-h-screen text-white">


                <div className="flex flex-col items-center justify-center text-center px-6 py-20">

                    <div className="logo font-bold text-6xl flex gap-3 mx-2 items-center">

                        <span>
                            <img
                                className="w-14"
                                src="/icons/coffee.png"
                                alt=""
                            />
                        </span>

                        <div>
                            <span className='text-white'>Get</span>
                            <span className='text-green-500'>Me</span>
                            <span className='text-white'>A</span>
                            <span className='bg-white text-green-950 px-2 py-1 rounded-4xl border border-black'>
                                Coffee
                            </span>
                        </div>

                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold mt-15 leading-tight">

                        Support Your Favorite
                        <span className="text-green-500"> Creators</span>

                    </h1>

                    <p className="max-w-3xl text-slate-300 text-lg mt-6 leading-8">

                        GetMeACoffee is a platform where fans can directly support
                        creators, developers, artists, musicians, writers and
                        streamers by buying them a coffee ☕ and helping them keep
                        creating amazing content.

                    </p>

                    <Link href={"/login"}>
                        <button className="mt-10 px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300 text-lg font-bold shadow-sm shadow-green-900">
                            Start Supporting
                        </button>
                    </Link>

                </div>


                <div className="grid md:grid-cols-3 gap-8 px-8 md:px-20 py-16">

                    <div className="bg-green-950 border border-green-800 rounded-2xl p-8 shadow-lg shadow-green-900">

                        <div className="text-5xl mb-5">
                            ☕
                        </div>

                        <h2 className="text-2xl font-bold mb-4">
                            Buy a <span className='text-green-500 text-3xl'>Coffee</span>
                        </h2>

                        <p className="text-slate-300 leading-7">

                            Fans can support creators instantly with small donations
                            that feel simple, fast and meaningful.

                        </p>

                    </div>

                    <div className="bg-green-950 border border-green-800 rounded-2xl p-8 shadow-lg shadow-green-900">

                        <div className="text-5xl mb-5">
                            💚
                        </div>

                        <h2 className="text-2xl font-bold mb-4">
                            Build <span className='text-green-500 text-3xl'>Community</span>
                        </h2>

                        <p className="text-slate-300 leading-7">

                            Create a stronger bond between creators and supporters
                            through messages, appreciation and community support.

                        </p>

                    </div>

                    <div className="bg-green-950 border border-green-800 rounded-2xl p-8 shadow-lg shadow-green-900">

                        <div className="text-5xl mb-5">
                            🚀
                        </div>

                        <h2 className="text-2xl font-bold mb-4">
                            Grow <span className='text-green-500 text-3xl'>Creatively</span>
                        </h2>

                        <p className="text-slate-300 leading-7">

                            Help creators continue making quality content without
                            relying completely on ads or sponsorships.

                        </p>

                    </div>

                </div>


                <div className="px-8 md:px-20 py-20 text-center">

                    <h2 className="text-4xl font-extrabold mb-8">

                        Our  <span className='text-green-500 text-5xl'>Mission</span>

                    </h2>

                    <p className="max-w-4xl mx-auto text-slate-300 text-lg leading-9">

                        We believe creators deserve direct support from the people
                        who love their work. GetMeACoffee makes funding simple,
                        personal and motivating — one coffee at a time.

                    </p>

                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 md:px-20 py-12">

                    <div className="bg-green-950 rounded-2xl p-8 text-center border border-green-800">

                        <h3 className="text-4xl font-extrabold text-green-400">
                            10K+
                        </h3>

                        <p className="text-slate-300 mt-2">
                            Creators
                        </p>

                    </div>

                    <div className="bg-green-950 rounded-2xl p-8 text-center border border-green-800">

                        <h3 className="text-4xl font-extrabold text-green-400">
                            50K+
                        </h3>

                        <p className="text-slate-300 mt-2">
                            Supporters
                        </p>

                    </div>

                    <div className="bg-green-950 rounded-2xl p-8 text-center border border-green-800">

                        <h3 className="text-4xl font-extrabold text-green-400">
                            ₹25L+
                        </h3>

                        <p className="text-slate-300 mt-2">
                            Funded
                        </p>

                    </div>

                    <div className="bg-green-950 rounded-2xl p-8 text-center border border-green-800">

                        <h3 className="text-4xl font-extrabold text-green-400">
                            100%
                        </h3>

                        <p className="text-slate-300 mt-2">
                            Creator Love
                        </p>

                    </div>

                </div>


                <div className="py-20 text-center px-6">

                    <h2 className="text-5xl font-extrabold leading-tight">

                        Ready to Support Your
                        <span className="text-green-500"> Favorite Creator?</span>

                    </h2>

                    <p className="text-slate-300 mt-6 text-lg">

                        Join thousands of fans helping creators do what they love.

                    </p>

                    <Link href={"/login"}>
                        <button className="mt-10 px-10 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300 text-lg font-bold shadow-sm shadow-green-900">
                            Get Started
                        </button>
                    </Link>

                </div>

            </div>
        </>
    )
}

export default AboutPage

