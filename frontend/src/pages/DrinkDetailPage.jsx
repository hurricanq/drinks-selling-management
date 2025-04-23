import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import axios from "../config/axios";
import { formatDate, formatTime } from "../config/format"

import { useUserStore } from "../stores/useUserStore";
import { useDrinkStore } from "../stores/useDrinkStore";
import { useCartStore } from "../stores/useCartStore";

import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

const DrinkDetailPage = () => {
    const { id } = useParams(); // Get drink ID from URL

    const { user } = useUserStore();
    const { drink, reviews, loading, fetchDrink, fetchReviews, createReview } = useDrinkStore();
    const { addToCart } = useCartStore();

    const [userRating, setUserRating] = useState(0);
    const [review, setReview] = useState("")

    const [activeTab, setActiveTab] = useState('Description')
    const tabs = ['Description', 'Reviews', 'Similar Products'];

    // Fetch drink details when the component mounts
    useEffect(() => {
        fetchDrink(id);
    }, [id, fetchDrink]);

    // Fetch reviews
    useEffect(() => {
        fetchReviews(id);
    }, [id, fetchReviews]);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add drinks to cart!", { id: "login" });
			return;
		} else {
			// Add to cart
			addToCart(drink);
		}
	};

    const submitRating = async (e) => {
        e.preventDefault();
        if (!user) {
			toast.error("Please login to submit your rating!", { id: "login" });
			return;
		} else {
            await axios.post(`/drinks/${id}/rate`, { rating: userRating });
            toast.success("Rating submitted!");
            window.location.reload();
		}
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
		if (!user) {
			toast.error("Please login to submit your review!", { id: "login" });
			return;
		} else {
			createReview(drink._id, { user: user._id, username: user.username, profilePic: user.profilePic, content: review });
            toast.success("Review submitted!");
            window.location.reload();
		}
    }

    if (loading) return <LoadingSpinner />;
  
    return (
        <div>
            <div className="mx-auto max-w-7xl py-5 lg:py-10 gap-5">
                <Breadcrumb />
                <div className="w-full p-4 rounded-xl flex flex-col lg:flex-row justify-between gap-10">
                    {/* Left Section */}
                    <div className="md:w-1/2 relative">
                        <img src={drink.image} alt="" className="w-full rounded-xl" />
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 text-center md:text-left lg:pr-10">
                        <div>
                            <h1 className="text-3xl font-bold text-primary-text">
                                {drink.name}
                            </h1>
                            <p className="text-lg mt-3 text-yellow-700">
                                {drink.avgRating?.toFixed(1)} ⭐ ({drink.numRatings} ratings)
                            </p>
                            <div className="mt-5">
                                <p className="text-4xl font-bold text-gray-700">
                                    ${drink.price}
                                    <span className="ml-5 text-base font-normal line-through">${drink.price + 0.5}</span>
                                </p> 
                            </div>
                        </div>
                        <hr className="my-5"></hr>
                        <div className="p-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg">Rate the Drink!</h2>

                                <form onSubmit={submitRating} className="flex gap-5">
                                    <select value={userRating} onChange={(e) => setUserRating(e.target.value)}>
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>{num} ⭐</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="bg-primary-text px-5 py-2 rounded-lg text-white text-lg flex items-center gap-2 hover:opacity-70 transition-opacity">Submit Rating</button>
                                </form>
                            </div>
                        </div>

                        <Button className="w-full mt-10 bg-primary-text" onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                    </div>    
                </div>

                {/* Tabs Section */}
                <div className="flex justify-center gap-3 mt-5">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            className={`px-2 py-1 border-b-2 cursor-pointer text-primary-text ${activeTab === tab ? "border-b-primary-text" : "border-b-transparent" }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {activeTab === "Description" && (
                    <div className="w-full p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl justify-between gap-10">
                        <div className="flex flex-col gap-3 p-5">
                            <h2 className="text-xl font-bold">Description</h2>
                            <p>{drink.description}</p>   
                        </div>
                    </div>
                )}

                {activeTab === "Reviews" && (
                <div className="w-full p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl justify-between gap-10">
                    <div className="flex flex-col gap-3 p-5">
                        <h2 className="text-xl font-bold">Reviews ({reviews.length})</h2>
                        <div>
                            <form onSubmit={handleSubmitReview} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <input
                                        id="content"
                                        name="content"
                                        type="text"
                                        value={review}
                                        required
                                        placeholder="Enter your review here..."
                                        onChange={(e) => setReview(e.target.value)}
                                        className="rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-text sm:text-sm/6"
                                    />
                                    <button
                                        type="submit"
                                        className="justify-center rounded-md bg-primary-text px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        {reviews.map(review => {
                            return (
                                <div key={review._id} className="px-5 py-2">
                                    <div className="flex gap-5">
                                        <div className="w-14 h-14">
                                            <img src={review.profilePic} alt="" className="rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{review.username}</h3>
                                            <p className="text-gray-700">{formatDate(review.createdAt)} at {formatTime(review.createdAt)}</p>
                                        </div>
                                    </div>
                                    <p className="mt-5 text-lg">{review.content}</p>
                                </div>
                            )
                        })} 
                    </div>
                </div>
                )}

                {activeTab === "Similar Products" && (
                    <div className="w-full p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl justify-between gap-10">
                        <div className="flex flex-col gap-3 p-5">
                            <h2 className="text-xl font-bold">Similar Products</h2>
                            <p>No similar products found.</p>   
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DrinkDetailPage
