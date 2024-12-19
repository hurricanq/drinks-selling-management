import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'

const AdminUpdate = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [product, setProduct] = useState({
        name: "",
        desc: "",
        price: null,
        image: "",
        categoryID: null,
        bestSelling: 0
    })

    const productId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setProduct(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/product/${productId}`, product);
            navigate("/admin-products");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
        <div className="bg-white font-poppins">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <div className="mb-5">
                    <Link to="/admin-products" className="hover:text-primary-bg transition-colors"><span>&larr;</span> Back to Products List</Link>
                </div>
                <div className="my-3">
                    <h1 className="font-bold text-xl">Edit Product</h1> 
                </div>
                <div className="my-3 border-solid border-2 border-gray-400 rounded-xl px-3 py-1">
                    <div className="flex justify-between gap-x-3">
                        <div>
                            <h2>Name</h2>
                            <input type="text" name="name" placeholder="e.g. Peach Tea" onChange={handleChange} className="px-3" />
                        </div>
                        <div>
                            <h2>Description</h2>
                            <input type="text" name="desc" placeholder="e.g. A tea." onChange={handleChange} className="px-3" />
                        </div>
                        <div>
                            <h2>Price</h2>
                            <input type="text" name="price" placeholder="e.g. 1.5" onChange={handleChange} className="px-3" />
                        </div>
                        <div>
                            <h2>Image Link</h2>
                            <input type="text" name="image" placeholder="e.g. peachTea.jpg" onChange={handleChange} className="px-3" />
                        </div>

                        <div>
                            <h2>Category</h2>
                            <input type="text" name="categoryID" placeholder="e.g. 2" onChange={handleChange} className="px-3" />
                        </div>
                        </div>
                        <div className="my-3">
                            <button onClick={handleSubmit} className="block ml-auto px-3 py-1 bg-blue-400 text-white hover:opacity-80 rounded-xl">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUpdate
