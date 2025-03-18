import React from 'react';

const CardComponent = (props) => {
    return (
        <div className="p-5 shadow-sm rounded-xl">
            {/* Image */}
            <div className="rounded-xl overflow-hidden">
                <img
                    src={props.image}
                    alt={props.name}
                    className="hover:scale-110 transition-transform"
                />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1 mt-5">
                <h5 className="text-xl font-bold">{props.name}</h5>
                <div className="flex justify-between items-center">
                    <p>${props.price}</p>
                    <p>⭐ {props.avgRating}</p>
                </div>

            </div>    
        </div>
    )
}

export default CardComponent
