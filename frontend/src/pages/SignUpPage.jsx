import React, { useState } from 'react'

import { Link } from "react-router-dom"

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (        
        <div className="h-screen mx-auto max-w-7xl grid lg:grid-cols-2">
            {/* Left Side - Image */}
            <div className="hidden lg:flex items-center justify-center p-6">
                <img src="./assets/signup.jpg" alt="" />
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center p-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign up for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Email
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            required
                            autoComplete="email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Password
                        </label>

                        <div className="mt-2 relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            required
                            autoComplete="current-password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>

                        <div className="flex justify-between items-center text-sm mt-3">
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold">Remember me</p>
                            <input type="checkbox" name="remember" className="cursor-pointer" />
                        </div>
                        <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </Link>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Sign up
                        </button>
                    </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Log in
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage