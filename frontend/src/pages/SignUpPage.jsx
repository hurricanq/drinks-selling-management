import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";
import { validateField, validateForm, hasErrors } from "../utils/validation";
import OptimizedImage from "../components/OptimizedImage";

const SignUpPage = () => {
    const { signup, loading } = useUserStore();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
    });

    const [touched, setTouched] = useState({
        username: false,
        email: false,
        phoneNumber: false,
        password: false
    });

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErrors(prev => ({
            ...prev,
            [field]: validateField(field, formData[field])
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

        // If no errors, proceed with signup
        if (!hasErrors(formErrors)) {
            signup(formData);
        }
    };

    return (  
        <div>      
            <div className="mx-auto max-w-7xl grid lg:grid-cols-2 mt-10">
                {/* Left Side - Image */}
                <div className="hidden lg:flex items-center justify-center p-6">
                    <OptimizedImage src="./assets/signup.jpg" alt="Image" className="rounded-xl" />
                </div>

                {/* Right Side - Form */}
                <div className="flex flex-col justify-center p-6">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <OptimizedImage
                            alt="Your Company"
                            src="./assets/logo.png"
                            className="mx-auto h-20 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        required
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("username")}
                                        className={`block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ${
                                            touched.username && errors.username 
                                                ? 'border-red-500 ring-red-300 focus:ring-red-500' 
                                                : 'border-gray-300 ring-gray-300 focus:ring-primary-text'
                                        } placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
                                    />
                                    {touched.username && errors.username && (
                                        <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                                    )}
                                </div>
                            </div>

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

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        value={formData.phoneNumber}
                                        required
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("phoneNumber")}
                                        className={`block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ${
                                            touched.phoneNumber && errors.phoneNumber 
                                                ? 'border-red-500 ring-red-300 focus:ring-red-500' 
                                                : 'border-gray-300 ring-gray-300 focus:ring-primary-text'
                                        } placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
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
                            </div>

                            {/* Sign Up Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md bg-primary-text px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-brown-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Signing up...' : 'Sign up'}
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-primary-text hover:text-brown-600">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;