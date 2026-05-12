import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({
        site: "",
        username: "",
        password: ""
    })

    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")

        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {

        navigator.clipboard.writeText(text)

        toast.success('Copied to clipboard !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            localStorage.setItem(
                "passwords",
                JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
            )

            setform({
                site: "",
                username: "",
                password: ""
            })

            toast.success('Password Saved Successfully !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
        else {
            toast.error('Error : Password Not Saved !', {
            });

        }
    }

    const deletePassword = (id) => {

        let c = confirm("Do you want to delete this password ?")

        if (c) {

            setpasswordArray(passwordArray.filter(item => item.id !== id))

            localStorage.setItem(
                "passwords",
                JSON.stringify(passwordArray.filter(item => item.id !== id))
            )

            toast.success('Password Deleted !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    }

    const editPassword = (id) => {

        setform(passwordArray.filter(i => i.id === id)[0])

        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handlechange = (e) => {

        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const showPassword = () => {

        if (ref.current.src.includes("icons/eyecross.png")) {

            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"

        } else {

            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Slide}
            />

            <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className="bg-purple-200 w-[95%] md:max-w-4xl mx-auto mycontainer my-5 rounded-4xl border border-white p-4 md:p-6 overflow-hidden mb-10">

                <h1 className='text-center font-bold text-white text-2xl md:text-3xl'>
                    <span className='text-purple-800 font-extrabold border-2 border-white p-1'>P</span>
                    <span>ass</span>
                    <span className='bg-purple-800 p-2 rounded-full'>Manager</span>
                </h1>

                <p className='text-slate-700 text-center py-2'>
                    Your Own Password Manager
                </p>

                <div className="text-black flex flex-col p-4 gap-4 py-10 items-center">

                    <input
                        value={form.site}
                        onChange={handlechange}
                        className='rounded-full border-2 border-white w-full px-4 py-2'
                        placeholder='Enter Website URL'
                        type="text"
                        name='site'
                    />

                    <div className="flex flex-col md:flex-row w-full justify-around gap-4 md:gap-8">

                        <input
                            value={form.username}
                            onChange={handlechange}
                            className='rounded-full border-2 border-white w-full px-4 py-2'
                            placeholder='Enter Username'
                            type="text"
                            name='username'
                        />

                        <div className="relative w-full">

                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handlechange}
                                className='w-full rounded-full border-2 border-white px-4 py-2 pr-12 outline-none'
                                placeholder='Enter Password'
                                type="password"
                                name='password'
                            />

                            <span
                                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                                onClick={showPassword}
                            >
                                <img
                                    ref={ref}
                                    width={22}
                                    src="icons/eye.png"
                                    alt="eye"
                                />
                            </span>

                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className='flex justify-center items-center bg-purple-500 text-white rounded-full py-2 w-full md:w-fit hover:bg-purple-400 border-white border gap-1 px-5'
                    >

                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                        >
                        </lord-icon>

                        Add Password

                    </button>
                </div>

                <div className="passwords overflow-x-auto">

                    <h2 className='font-bold text-2xl md:text-3xl py-4'>
                        Your Passwords
                    </h2>

                    {passwordArray.length === 0 &&
                        <div className='text-slate-800'>
                            There are no passwords to show...
                        </div>
                    }

                    {passwordArray.length != 0 &&

                        <table className="table-auto min-w-175 w-full border-separate border-spacing-0 mb-5">

                            <thead className='bg-purple-800 text-white border-2 border-white'>

                                <tr>
                                    <th className='py-3'>Site</th>
                                    <th className='py-3'>Username</th>
                                    <th className='py-3'>Password</th>
                                    <th className='py-3'>Actions</th>
                                </tr>

                            </thead>

                            <tbody className='border-2 border-white bg-purple-300 text-slate-700'>

                                {passwordArray.map((item, index) => {

                                    return (

                                        <tr key={index}>

                                            <td className='p-4 border border-white text-center'>

                                                <div className='flex items-center justify-center gap-3'>

                                                    <a href={item.site} target='_blank'>
                                                        {item.site}
                                                    </a>

                                                    <img
                                                        className='size-3 cursor-pointer hover:border border-white'
                                                        onClick={() => { copyText(item.site) }}
                                                        src="/icons/copy.png"
                                                        alt=""
                                                    />

                                                </div>

                                            </td>

                                            <td className='p-4 border border-white text-center'>

                                                <div className='flex items-center justify-center gap-3'>

                                                    <span>{item.username}</span>

                                                    <img
                                                        className='size-3 cursor-pointer hover:border border-white'
                                                        onClick={() => { copyText(item.username) }}
                                                        src="/icons/copy.png"
                                                        alt=""
                                                    />

                                                </div>

                                            </td>

                                            <td className='p-4 border border-white text-center'>

                                                <div className='flex items-center justify-center gap-3'>

                                                    <span>{item.password}</span>

                                                    <img
                                                        className='size-3 cursor-pointer hover:border border-white'
                                                        onClick={() => { copyText(item.password) }}
                                                        src="/icons/copy.png"
                                                        alt=""
                                                    />

                                                </div>

                                            </td>

                                            <td className='p-4 border border-white text-center'>

                                                <div className='flex justify-center gap-4'>

                                                    <span
                                                        className='cursor-pointer'
                                                        onClick={() => { editPassword(item.id) }}
                                                    >

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/vysppwvq.json"
                                                            trigger="hover"
                                                            stroke="bold"
                                                            colors="primary:#000000,secondary:#000000"
                                                            style={{ width: "20px", height: "20px" }}
                                                        >
                                                        </lord-icon>

                                                    </span>

                                                    <span
                                                        className='cursor-pointer'
                                                        onClick={() => { deletePassword(item.id) }}
                                                    >

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/tftntjtg.json"
                                                            trigger="hover"
                                                            stroke="bold"
                                                            colors="primary:#000000,secondary:#000000"
                                                            style={{ width: "20px", height: "20px" }}
                                                        >
                                                        </lord-icon>

                                                    </span>

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager