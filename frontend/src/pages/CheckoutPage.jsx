import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../config/axios";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const CheckoutPage = () => {
    const { user } = useUserStore();
    const { cart, total, subtotal } = useCartStore();
    const navigate = useNavigate();

    const [orderInfo, setOrderInfo] = useState({
        username: user.username,
        email: user.email,
        phoneNumber: String(user.phoneNumber),
        address: ""
    })

    const handlePayment = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("/payment/momo");
            console.log(response, 'res');

            if (response.data.message == "Thành công.") {
                // Redirect to MOMO transaction page
                window.location.href = response.data.payUrl;
            }
        } catch (error) {
            console.error('Error during payment:', error);
            alert("Error!");
        }
    }

    const handleSendEmail = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("/payment/email", orderInfo);
            console.log(response, 'res');

            if (response.data.status == "Successful") {
                navigate("/successful")
            }
        } catch (error) {
            console.error('Error when sending email:', error);
            alert("Error!");
        }

        navigate("/successful")
    }

    return (
        <div className="h-screen">
            <div className="mx-auto max-w-7xl py-10 flex flex-col lg:flex-row gap-5">
                {/* Drinks in Cart */}
                <div className="md:w-1/2 p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl">
                    <h1 className="text-2xl font-bold">Your Cart</h1>

                    <div className="flex flex-col justify-center gap-3 mt-5">
                        {cart.map((item) => (
                            <div key={item._id} className="flex gap-5 items-center">
                                <div className="w-20 rounded-xl overflow-hidden">
                                    <img src={`./assets/${item.image}`} alt={item.name} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">{item.name}</h2>
                                    <p className="text-lg font-bold">${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="md:w-1/2 p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl">
                    <div>
                        <h1 className="text-2xl font-bold">Address</h1>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            placeholder="Enter your address here..."
                            onChange={(e) => setOrderInfo(prev => ({...prev, [e.target.name]: e.target.value}))}
                            className="mt-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-text sm:text-sm/6"
                        /> 
                    </div>

                    <div className="mt-5">
                        <h1 className="text-2xl font-bold">Order Summary</h1>

                        {/* Prices */}
                        <div className="flex flex-col gap-3 mt-3">
                            <div className="flex justify-between items-center">
                                <p>Subtotal:</p>
                                <p className="text-xl font-bold">${subtotal}</p>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center">
                                <p>Total:</p>
                                <p className="text-xl font-bold">${total}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payments */}
                    <div className="flex items-center justify-center gap-x-3 mt-5">
                        <button className="flex items-center gap-x-3 px-3 py-1 border-solid border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition-colors rounded-xl" onClick={handlePayment}><img src="./assets/momo.png" alt="MOMO" className="w-8 block m-auto" />Pay with MOMO</button>
                        <button className="flex items-center gap-x-3 px-3 py-1 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl" onClick={handleSendEmail}><img src="./assets/wallet.svg" alt="Wallet" className="w-8 block m-auto" />Pay with Cash</button>
                    </div>

                    <p className="text-center mt-5">
                        or <Link to="/menu" className="text-pink-500">Continue Shopping</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
