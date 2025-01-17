import React, { useState } from "react";

const users = [
    { id: 1, name: 'demo1', email: 'demo1@gmail.com', password: 'demo1' },
    { id: 2, name: 'demo2', email: 'demo2@gmail.com', password: 'demo12' },
    { id: 3, name: 'demo3', email: 'demo3@gmail.com', password: 'demo123' }
]

export const Login = ({setUser}) => {

    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState('');

    const onName = (e) => {
        setName(e.target.value);
    }
    const onPassword = (e) => { 
        setPassword(e.target.value);
     }

    const handleLogin = (e) => {
        e.preventDefault();

        const loggedInUser = users.find(user => user.name === name && user.password === password);

        if (loggedInUser) {
            setUser(loggedInUser)
            setMsg('Login Successfull')
        } else {
            setMsg('Invalid Name & Password')
        }
        
        setName('')
        setPassword('')
    }
    return (
        <>  
            <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg sm:flex" >
                    <div className="m-0 md:w-7/12 md:h-80 h-80 rounded-3xl bg-gray-400 bg-cover bg-center " style={{
    
                        backgroundImage: "url('https://i.pinimg.com/736x/44/b9/8e/44b98ea0ec307b62e4c6f85385190022.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom',
                    }}></div>
                    <div className="w-full sm:w-3/5 z-10 bg-red">
                        <div className="p-4">
                            <h1 className="text-3xl font-black text-slate-700">Login</h1>
                            <p className="mt-2 mb-5 text-base leading-tight text-gray-600">Welcom to Weather React app</p>
                            <form className="mt-8" onSubmit={handleLogin}>

                                <div className="relative mt-2 w-full">
                                    <input type="text" id="email" value={name} onChange={onName} className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />

                                    <label htmlFor="email" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Name </label>
                                </div>

                                <div className="relative mt-2 w-full">
                                    <input type="text" id="password" value={password} onChange={onPassword} className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder="Password" />
                                    <label htmlFor="password" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Password</label>
                                </div>

                                <input className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400" type="submit" value="Login" />
                                {msg && <p>{msg}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}