import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios";

const AdminProducts = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [toggleAdd, setToggleAdd] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [best, setBest] = useState(false)

    const [product, setProduct] = useState({
        name: "",
        desc: "",
        price: null,
        image: "",
        categoryID: null,
        bestSelling: 0
    })

    const handleToggleAdd = () => {
        setToggleAdd(!toggleAdd)
    }

    const handleToggleEdit = () => {
        setToggleEdit(!toggleEdit)
    }

    const handleChange = (e) => {
        setProduct(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:8800/product", product)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleBest = () => {
        setBest(!best)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/product/${id}`)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    {/* Fetch all categories */}
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8800/category");
                setCategories(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllCategories();
    }, []);

    {/* Fetch all products */}
    useEffect(() => {
        const fetchAllProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8800/product");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
        };
    
        fetchAllProducts();
    }, []);

    const productCard = products.map(product => {
        return (
            <div key={product.id} className="border-solid border-2 border-gray-400 rounded-xl px-3 py-2 mb-1">
                <div className="flex gap-x-3">
                    <img src={`./assets/${product.productImage}`} alt="Product" className="w-20 rounded-xl" />
                    <div>
                        <h2 className="font-bold">{product.productName}</h2>
                        <p>{product.categoryID}</p>
                        <p>${product.productPrice}</p>
                    </div>
                </div>
                <div className="flex justify-center gap-x-3 mt-3">
                    <button className="px-3 py-1 bg-blue-400 text-white hover:opacity-80 rounded-xl"><Link to={`/admin-update/${product.id}`}>Edit</Link></button>
                    <button onClick={() => handleDelete(product.id)} className="px-3 py-1 bg-red-400 text-white hover:opacity-80 rounded-xl">Delete</button>
                    <button className="px-3 py-1 bg-yellow-300 text-white hover:opacity-80 rounded-xl">
                        <img src={`./assets/${product.bestSelling ? "starUnfilled.svg" : "starFilled.svg"}`} alt="" onClick={handleBest} />
                    </button>
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="bg-white font-poppins">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                    <div className="mb-5">
                        <a href="/admin" className="hover:text-primary-bg transition-colors"><span>&larr;</span> Back to Commands</a>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <h1 className="font-bold text-xl">Products</h1> 
                        <button className="hover:text-blue-400 transition-colors" onClick={handleToggleAdd}>Add a product</button>
                    </div>
                    {toggleAdd &&
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
                    }
                    <div className="grid grid-cols-4 gap-x-3 gap-y-3">
                        {productCard}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProducts
