import React from 'react';
import { Link } from "react-router-dom";

import { ArrowLongRightIcon } from "@heroicons/react/24/solid"

import { motion } from "framer-motion";
import AnimatedCounter from "../components/AnimatedCounter";

const featuredCategories = [
    {
        name: "Coffee",
        desc: "Rich, bold flavor and contains caffeine, a natural stimulant that helps increase alertness and energy.",
        image: "./assets/coffeeCategory.png"
    },
    {
        name: "Tea",
        desc: "Comes in various types, including green, black, white, and oolong, each differing in flavor, aroma, and caffeine content based on processing methods.",
        image: "./assets/teaCategory.png"
    },
    {
        name: "Freeze",
        desc: "Slushy or solid, depending on the desired consistency. Popular for refreshing summer beverages and enhancing texture and flavor.",
        image: "./assets/freezeCategory.png"
    }
];

const statistics = [
    {
        value: 5,
        label: "Stores"
    },
    {
        value: 100,
        label: "Drinks"
    },
    {
        value: 1000,
        label: "Reviews"
    }
];

const HomePage = () => {
    return (
        <div>
            {/* Hero */}
            <div className="bg-primary-bg">
                <div className="relative mx-auto max-w-7xl px-10 lg:px-1 py-10 lg:py-1 flex flex-col lg:flex-row items-center">
                    {/* Left Section */}
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 2.0, ease: "easeOut" }}
                    >
                        <div className="flex flex-col text-center lg:text-left gap-3">
                            <h1 className="text-5xl lg:text-7xl font-bold text-primary-text">Enormous store <br /> of drinks!</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget metus mi. Etiam iaculis, arcu viverra ullamcorper egestas, quam urna ornare est, vel tristique ligula nulla id elit.</p>
                        </div>

                        <div className="mt-5">
                            <Link to="/menu">
                                <button className="bg-primary-text px-5 py-2 rounded-xl text-white text-lg flex items-center gap-2 hover:opacity-70 transition-opacity">
                                    Visit menu 
                                    <ArrowLongRightIcon className="h-5"/>
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                    
                    {/* Right Section */}
                    <motion.div
                        className="md:w-1/2 aspect-square"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 2.0, ease: "easeOut" }}
                    >
                        <img src="./assets/home.png" alt="" />
                    </motion.div>
                </div>
            </div> 

            {/* Our Menu (Categories) */}
            <div className="py-10">
                <div className="mx-auto max-w-7xl px-10 lg:px-1 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-primary-text">Our Menu</h1>
                    <div className="grid grid-cols-3 gap-10 mt-3">
                        {featuredCategories.map(category => {
                            return (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1.0, ease: "easeOut" }}
                                >
                                    <div className="w-full overflow-hidden aspect-square">
                                        <img src={category.image} alt="" className="hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex flex-col text-center gap-3 mt-3">
                                        <h2 className="text-lg font-bold text-primary-text">{category.name}</h2>
                                        <p className="text-gray-700">{category.desc}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* About Us */}
            <div className="py-10">
                <div className="mx-auto max-w-7xl px-10 lg:px-1 flex flex-col lg:flex-row items-center justify-between">
                    {/* Left Section */}
                    <motion.div
                        className="md:w-1/2 text-center md:text-left flex flex-col gap-5 lg:pr-10"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                    >
                        <h1 className="text-3xl font-bold text-primary-text">
                            About Us
                        </h1>
                        <p className="text-gray-700 text-lg">
                            We serve freshly brewed coffee, espresso-based drinks, and other beverages like tea and hot chocolate. The store offers a cozy atmosphere where customers can relax, work, or socialize.
                        </p>

                        <Link to="/about">
                            <button className="bg-primary-text px-5 py-2 rounded-xl text-white text-lg flex items-center gap-2 hover:opacity-70 transition-opacity">
                                Learn more 
                                <ArrowLongRightIcon className="h-5"/>
                            </button>
                        </Link>
                    </motion.div>

                    {/* Right Section */}
                    <motion.div
                        className="md:w-1/2 mt-8 md:mt-0 relative aspect-auto"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                    >
                        <img
                            src='./assets/coffeeShop.jpg'
                            alt="Coffee"
                            className="w-full rounded-lg"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Statistics */}
            <div className="py-10">
                <div className="mx-auto max-w-7xl px-10 lg:px-1 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-primary-text">Statistics</h1>
                    <div className="grid grid-cols-3 gap-20 mt-5">
                        {statistics.map(stat => {
                            return (
                                <motion.div 
                                    className="flex flex-col text-center gap-3 mt-3"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1.0, ease: "easeOut" }}
                                >
                                    <div className="text-5xl font-bold text-primary-text">
                                        <AnimatedCounter value={stat.value} />
                                    </div>
                                    <h2 className="text-md font-bold text-gray-700">{stat.label}</h2>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
