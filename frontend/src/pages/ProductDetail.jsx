// ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { useDispatch } from 'react-redux'
import { addToCart } from '../stores/cartSlice'

import axios from 'axios'

import { Rating } from "@material-tailwind/react";

const styles = {
    tabs: {
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
    },
    tab: {
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        fontSize: '1rem',
    },
    activeTab: {
        borderBottom: '2px solid black',
        fontWeight: '600',
    }
};

const ProductDetail = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const { info } = location.state || {} // Retrieve passed data

    const tabs = ['Description', 'Reviews', 'Similar Products'];

    const formatDateISO = (date) => {
        // Convert the date to ISO string
        const isoString = date.toISOString();
        // Split at the "T" character to get the date part
        const formattedDate = isoString.split("T")[0];
        return formattedDate;
    };
    
    const currentDate = new Date();
    const curDate = formatDateISO(currentDate); // Output: yyyy-mm-dd

    const [price, setPrice] = useState(info.price)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('Description')
    const [reviews, setReviews] = useState([])
    const [inputReview, setInputReview] = useState({
        userId: 8,
        productId: info.id,
        reviewContent: "",
        reviewDate: curDate
    })
    const [products, setProducts] = useState([])

    const handleChange = (e) => {
        setInputReview(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleOption = (e) => {
        e.target.value.includes("XL") ? setPrice(info.price + 0.5) : setPrice(info.price)
    }

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:8800/review", inputReview)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: info.id,
            image: info.image,
            name: info.name,
            price: price,
            quantity: quantity
        }))
    }
    
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

    {/* Fetch all reviews */}
    useEffect(() => {
        const fetchAllReviews = async () => {
        try {
            const res = await axios.get("http://localhost:8800/review");
            setReviews(res.data);
        } catch (err) {
            console.log(err);
        }
        };
    
        fetchAllReviews();
    }, []);

    const totalReviews = reviews.filter(review => review.productId == info.id).length

    const reviewCard = reviews.filter(review => review.productId == info.id).map(review => {
        return (
            <div key={review.id} className="flex gap-5 mb-5 px-5 py-2.5">
                <img src={`./assets/pfp.jpg`} alt="Profile" className="w-16 object-cover rounded-full" />
                <div className="flex-1 px-5 py-1 bg-gray-300 rounded-xl">
                    <h4 className="text-lg font-bold">{review.username} <span className="text-sm font-normal ml-5">{review.reviewDate.split('T')[0]}</span></h4>
                    <p>{review.reviewContent}</p>
                </div>
            </div>
        )
    })

    return (
        <>
            <Navbar isMenu={true} isContact={false} isAbout={false} />
            <div className="bg-white font-poppins">
                <div className="mx-auto max-w-2xl min-h-screen px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="text-lg mb-2">
                        <Link to="/products" className="hover:text-primary-bg transition-colors">Menu</Link> &gt; {info.category} &gt; <span className="font-semibold">{info.name}</span> 
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col lg:flex-row gap-5">
                            {/* Product Image Section */}
                            <div className="self-start w-52 lg:w-96 object-cover shadow-xl">
                                <img src={`./assets/${info.image}`} alt="Product" className="rounded-xl"/>   
                            </div>

                            {/* Product Details Section */}
                            <div className="flex-1 px-7 py-5">
                                <h2 className="text-3xl font-bold mb-2">{info.name}</h2>
                                <p className="text-2xl font-bold mb-2 text-primary-text">{`$${price}`}</p>

                                <p className="text-green-600">In Stock</p>
                                <div className="my-3">
                                    <p className="mb-2">Choose a size:</p>
                                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }} onClick={handleOption}>
                                        <option>L (+ $0)</option>
                                        <option>XL (+ $0.5)</option>
                                    </select>
                                </div>

                                <div className="my-6 flex items-center gap-x-3">
                                    <p>Rate the product!</p>
                                    <Rating value={4} />
                                </div>



                                <div className="flex items-center justify-center gap-2">
                                    <button className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex items-center justify-center" onClick={handleMinusQuantity}>
                                        -
                                    </button>
                                    <span className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex items-center justify-center">{quantity}</span>
                                    <button className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex items-center justify-center" onClick={handlePlusQuantity}>
                                        +
                                    </button>
                                </div>

                                <button className="w-full mt-6 px-3 py-1 border-solid border-2 border-slate-700 rounded-xl hover:bg-slate-700 hover:text-white transition-colors" onClick={handleAddToCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div style={styles.tabs}>
                        {tabs.map((tab) => (
                        <div
                            key={tab}
                            style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-3">
                        {activeTab === 'Description' && (
                        <p>{info.desc}</p>
                        )}

                        {activeTab === 'Reviews' && (
                        <div>
                            <div className="my-5 flex gap-5">
                                <input type="text" placeholder="Submit a review here..." className="px-5" name="reviewContent" onChange={handleChange} />
                                <button className="bg-slate-700 text-white hover:opacity-80 transition-opacity py-2 px-5 rounded-lg" onClick={handleSubmitReview}>Submit</button>
                            </div>

                            <h3 className="text-xl font-bold mb-2.5">{`${totalReviews} Review${totalReviews == 1 ? '' : 's'}`}</h3>
                            {reviewCard}
                        </div>
                        )}

                        {activeTab === 'Similar Products' && (
                            <div className="flex gap-x-6 overflow-x-scroll items-center">
                                {products.map(product => (
                                <div key={product.id} className="flex flex-col gap-y-2 bg-gray-200 p-3 rounded-xl">
                                    <div className="">
                                        <img src={`./assets/${product.productImage}`} alt="Product" className="min-w-52 object-cover rounded-xl cursor-pointer" />
                                    </div>

                                    <h3 className="font-bold text-xl">{product.productName}</h3>
                                    <p>${product.productPrice}</p>
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;