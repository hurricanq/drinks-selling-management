import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { useDrinkStore } from "../stores/useDrinkStore";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useSearchStore } from "../stores/useSearchStore";

import LoadingSpinner from "../components/LoadingSpinner"
import Sidebar from "../components/Sidebar";
import InputSearch from "../components/InputSearch";
import SortByDropdown from "../components/SortByDropdown";
import CardComponent from '../components/CardComponent';

const MenuPage = () => {
    const { fetchAllDrinks, drinks, loading, sortBy, sortDrinks } = useDrinkStore();
    const { selectedCategory } = useCategoryStore();
    const { searchQuery } = useSearchStore();
    
    useEffect(() => {
        fetchAllDrinks();
    }, [fetchAllDrinks]);

    // Sort drinks when they are loaded
    useEffect(() => {
        if (drinks.length > 0) {
            const sortedDrinks = [...drinks];
            
            switch (sortBy) {
                case "name-asc":
                    sortedDrinks.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "name-desc":
                    sortedDrinks.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case "price-asc":
                    sortedDrinks.sort((a, b) => a.price - b.price);
                    break;
                case "price-desc":
                    sortedDrinks.sort((a, b) => b.price - a.price);
                    break;
                default:
                    break;
            }
            
            sortDrinks(sortBy);
        }
    }, [drinks.length, sortBy]); // Only run when drinks are loaded or sortBy changes

    // Filter drinks based on search query
    const filteredDrinks = drinks.filter(drink =>
        drink.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter(drink => String(drink.categoryId) === String(selectedCategory._id));

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="mx-auto max-w-7xl py-10 flex flex-col lg:flex-row gap-5">
                <Sidebar />

                <div className="w-full p-8 shadow-xl shadow-blue-gray-900/5 rounded-xl">
                    {/* Search & Filter */}
                    <div className="flex flex-row justify-between items-center gap-3">
                        <InputSearch />
                        <SortByDropdown />
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredDrinks.map(drink => {
                            return (
                                <div key={drink._id}>
                                    <Link to={`/drink/${drink._id}`}>
                                        <CardComponent name={drink.name} price={drink.price} image={drink.image} avgRating={drink.avgRating?.toFixed(1)} />
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
