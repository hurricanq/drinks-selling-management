import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import axios from 'axios'
import { toast } from 'react-toastify'

const LogIn = () => {
    const navigations = [
        { name: 'Menu', href: '/products' },
        { name: 'Contact', href: '/contact' },
        { name: 'About Us', href: '#' },
    ]

    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:8800/login", formValues);
            console.log(response, 'res');
      
            if (response.data.status == "Successful") {
                navigate("/")
            } else {
                alert("Error!")
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert("Error!");
        }
    }

    const fetchUserDetails = async () => {
        try {
            // Retrieve token from localStorage or other secure storage
            const token = sessionStorage.getItem('authToken'); // Replace with actual token retrieval
            console.log(token);
            
            if (!token) {
                // setError('User is not logged in');
                return;
            }
        
            // Make the API request with the token in the Authorization header
            const response = await axios.get('http://localhost:8800/user', {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
        
            console.log(response);
            
            if (response.data.success) {
                console.log(response.data.user);
            } else {
                console.log(response.data.message || 'Failed to fetch user details');
            }
        } catch (err) {
            console.error('Error fetching user details:', err);
            console.log(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <header>
                <nav className="flex items-center px-10 py-6 fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
                    {/* Logo */}
                    <div className="flex flex-1">
                        <a href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                            <img
                                alt=""
                                src="./assets/mangosteen.png"
                                className="h-8 w-auto"
                            />
                            <p className="text-xl font-bold">61House</p>
                        </a>
                    </div>
            
                    {/* Navigation Buttons */}
                    <div className="flex gap-x-12">
                        {navigations.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 hover:text-purple-400 transition-colors">
                                {item.name}
                            </a>
                        ))}
                    </div>
                </nav>
            </header>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="./assets/mangosteen.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                                </label>
                                <div className="text-sm">
                                <a href="#" className="font-semibold text-primary-text hover:text-primary-bg">
                                    Forgot password?
                                </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary-bg px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account yet?{' '}
                        <a href="/signin" className="font-semibold text-primary-text hover:text-primary-bg">
                        Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn
