import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useDrinkStore } from "../stores/useDrinkStore";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useSearchStore } from "../stores/useSearchStore";

import LoadingSpinner from "../components/LoadingSpinner"
import Sidebar from "../components/Sidebar";
import InputSearch from "../components/InputSearch";
import CardComponent from '../components/CardComponent';

const MenuPage = () => {
    const { fetchAllDrinks, drinks, loading } = useDrinkStore();
    const { selectedCategory } = useCategoryStore();

    const { searchQuery } = useSearchStore();
    
    useEffect(() => {
        fetchAllDrinks();
    }, [fetchAllDrinks]);

    // Filter drinks based on search query
    const filteredDrinks = drinks.filter(drink =>
        drink.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter(drink => String(drink.categoryId) === String(selectedCategory._id));

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="mx-auto max-w-7xl py-10 flex flex-col lg:flex-row gap-5">
                <Sidebar />

                <div className="w-full p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl">
                    {/* Search & Filter */}
                    <div className="flex flex-row justify-between items-center gap-3">
                        <InputSearch />
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredDrinks.map(drink => {
                            return (
                                <div key={drink._id}>
                                    <Link to={`/drink/${drink._id}`}>
                                        <CardComponent name={drink.name} price={drink.price} image={`./assets/${drink.image}`} avgRating={drink.avgRating?.toFixed(1)} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuPage
