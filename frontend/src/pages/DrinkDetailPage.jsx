import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import axios from "../config/axios";

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
    const { fetchDrink, drink, loading } = useDrinkStore();
    const { cart, addToCart } = useCartStore();

    const [userRating, setUserRating] = useState(0);
  
    useEffect(() => {
        fetchDrink(id); // Fetch drink details when the component mounts
    }, [id, fetchDrink]);

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

    if (loading) return <LoadingSpinner />;
  
    return (
        <div>
            <div className="mx-auto max-w-7xl py-10 gap-5">
                <Breadcrumb />
                <div className="w-full p-4 rounded-xl flex flex-col lg:flex-row justify-between gap-10">
                    {/* Left Section */}
                    <div className="md:w-1/2 mt-8 md:mt-0 relative">
                        <img src={`../assets/${drink.image}`} alt="" className="w-full rounded-xl" />
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
                            <div className="flex justify-between items-center mt-5">
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

                <div className="w-full p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl justify-between gap-10">
                    <div className="flex flex-col gap-3 p-5">
                        <h2 className="text-xl font-bold">Description</h2>
                        <p>{drink.description}</p>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrinkDetailPage
