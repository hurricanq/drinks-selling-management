import React from 'react';

const SuccessfulPage = () => {
    return (
        <div className="h-screen">
            <div className="mx-auto max-w-7xl p-10 flex flex-col items-center gap-10">
                <div className="text-center">
                    <p>Your order has been sent successfully!</p>
                    <p>Please wait for a call from our delivery person to receive your order!</p>
                </div>
                <img src="./assets/delivery.jpg" alt="Delivery" />
            </div>
        </div>
    )
}

export default SuccessfulPage
