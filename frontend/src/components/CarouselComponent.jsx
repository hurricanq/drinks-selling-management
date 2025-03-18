import React from 'react';

import { Carousel } from "@material-tailwind/react";

const CarouselComponent = () => {
    return (
        <Carousel className="rounded-xl">
            <img
                src="./assets/appleCarousel.jpg"
                alt="Image 1"
                className="h-full w-full object-cover"
            />
            <img
                src="./assets/orangeCarousel.jpg"
                alt="Image 2"
                className="h-full w-full object-cover"
            />
        </Carousel>
    )
}

export default CarouselComponent
