import React from 'react';

import CarouselComponent from "../components/CarouselComponent";
import ButtonComponent from "../components/ButtonComponent";

const HomePage = () => {
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
    ]

    return (
        <div>
            {/* Carousel */}
            <div className="h-96 pt-5 px-10">
                <CarouselComponent />
            </div>

            {/* Our Menu (Categories) */}
            <div className="mt-10 py-10">
                <div className="mx-auto max-w-7xl flex flex-col items-center">
                    <h1 className="font-bold text-3xl">Our Menu</h1>
                    <div className="grid grid-cols-3 gap-10 mt-3">
                        {featuredCategories.map(category => {
                            return (
                                <div key={category.name}>
                                    <div className="w-full overflow-hidden">
                                        <img src={category.image} alt="" className="hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex flex-col text-center gap-3 mt-3">
                                        <h2 className="text-lg font-bold">{category.name}</h2>
                                        <p className="text-gray-700">{category.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* About Us */}
            <div className="mt-10 py-10 ">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between">
                    {/* Left Section */}
                    <div className="md:w-1/2 text-center md:text-left flex flex-col gap-5 lg:pr-10">
                        <h1 className="text-3xl font-bold">
                            About Us
                        </h1>
                        <p className="text-gray-700 text-lg">
                            We serve freshly brewed coffee, espresso-based drinks, and other beverages like tea and hot chocolate. The store offers a cozy atmosphere where customers can relax, work, or socialize.
                        </p>
                        <ButtonComponent name="Learn more" />
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 mt-8 md:mt-0 relative">
                        <img
                            src='./assets/coffeeShop.jpg'
                            alt="Coffee"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
