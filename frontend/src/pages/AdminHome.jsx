import React from 'react'
import { Link } from "react-router-dom";

const AdminHome = () => {

    return (
        <>
            <div className="bg-white font-poppins">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                    <div className="mb-5">
                        Welcome back, Admin
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                        <Link to="/" className="px-3 py-1 bg-primary-bg text-white hover:opacity-80 rounded-xl text-center">Manage Categories</Link>
                        <Link to="/admin-products" className="px-3 py-1 bg-primary-bg text-white hover:opacity-80 rounded-xl text-center">Manage Products</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome
