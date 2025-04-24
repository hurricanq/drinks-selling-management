import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";
import { validateField, validateForm, hasErrors } from "../utils/validation";

const LogInPage = () => {
    const { login, loading } = useUserStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    // Load remembered email if it exists
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setFormData(prev => ({
                ...prev,
                email: rememberedEmail,
                rememberMe: true
            }));
        }
    }, []);

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErrors(prev => ({
            ...prev,
            [field]: validateField(field, formData[field])
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const formErrors = validateForm(formData);
        setErrors(formErrors);

        // If no errors, proceed with login
        if (!hasErrors(formErrors)) {
            login(formData.email, formData.password, formData.rememberMe);
        }
    };

    return (
        <div className="h-screen">
            <div className="mx-auto max-w-7xl grid lg:grid-cols-2 mt-10">
                {/* Left Side - Image */}
                <div className="hidden lg:flex items-center justify-center p-6">
                    <img src="./assets/login.jpg" alt="" className="rounded-xl" />
                </div>

                {/* Right Side - Form */}
                <div className="flex flex-col justify-center p-6">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="./assets/logo.png"
                            className="mx-auto h-20 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Log in to your account
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
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("email")}
                                        className={`block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ${
                                            touched.email && errors.email 
                                                ? 'border-red-500 ring-red-300 focus:ring-red-500' 
                                                : 'border-gray-300 ring-gray-300 focus:ring-primary-text'
                                        } placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
                                    />
                                    {touched.email && errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
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
                                        type="password"
                                        value={formData.password}
                                        required
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("password")}
                                        className={`block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ${
                                            touched.password && errors.password 
                                                ? 'border-red-500 ring-red-300 focus:ring-red-500' 
                                                : 'border-gray-300 ring-gray-300 focus:ring-primary-text'
                                        } placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
                                    />
                                    {touched.password && errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center text-sm mt-3">
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                            className="cursor-pointer h-4 w-4 rounded border-gray-300 text-primary-text focus:ring-primary-text"
                                        />
                                        <label htmlFor="remember" className="font-semibold cursor-pointer">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="#" className="font-semibold text-primary-text hover:text-brown-600">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {/* Sign In Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md bg-primary-text px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-brown-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Logging in...' : 'Log in'}
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold text-primary-text hover:text-brown-600">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;