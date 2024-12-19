import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { addToCart, removeFromCart, decreaseCart, clearCart } from '../stores/cartSlice';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const CheckOut = () => {
    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product))
    }

    const handleIncreaseCart = (product) => {
        dispatch(addToCart(product))
    }

    const [open, setOpen] = useState(false)
    
    const handleOpenClear = () => {
        setOpen(!open)
    }

    const handleClearCart = () => {
        setOpen(false)
        dispatch(clearCart());
    };

    const handleContinue = () => {
        if (cart.items.length == 0) {
            alert("Your cart is empty!")
        } else {
            navigate("/shipping")
        }
    }

    const subt = (items, propP, propQ) => {
        return items.reduce((acc, value) => acc + value[propP] * value[propQ], 0);
    }

    const orderSummary = {
        subtotal: subt(cart.items, 'price', 'quantity'),
        shipping: 1.0,
    };

    const total = Object.values(orderSummary).reduce((acc, value) => acc + value, 0);

    return (
        <div>
            <Navbar isMenu={false} isContact={false} isAbout={false} />
            <div className="font-poppins mx-auto max-w-2xl min-h-screen px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex gap-3">
                    {/* Product List */}
                    {cart.items.length === 0 ? (
                        <div className="flex-1 shadow-lg p-3 rounded-xl">
                            <p>Your cart is empty! <Link to="/products" className="text-primary-text hover:text-primary-bg">Go to Menu</Link></p>
                        </div>
                    ) : (
                        <div className="flex-1 shadow-lg p-3 rounded-xl">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-bold mb-5 text-primary-text">Your Cart</h1>
                                <button onClick={handleOpenClear} className="px-3 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl">Clear Cart</button>

                                {/* Confirm before redirecting to the successful page */}
                                <Dialog open={open} onClose={setOpen} className="relative z-10">
                                    <DialogBackdrop
                                        transition
                                        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                                    />

                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <DialogPanel
                                            transition
                                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                                        >
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                                <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                    Clear the cart
                                                </DialogTitle>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                    All products are going to be cleared from your cart.
                                                    Are you sure you want to proceed?
                                                    </p>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                onClick={handleClearCart}
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            >
                                                Clear
                                            </button>
                                            <button
                                                type="button"
                                                data-autofocus
                                                onClick={() => setOpen(false)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                Cancel
                                            </button>
                                            </div>
                                        </DialogPanel>
                                        </div>
                                    </div>
                                    </Dialog>
                            </div>

                            {cart.items?.map(item => (
                                <div key={item.productId} className="flex items-center py-3">
                                    <img src={`./assets/${item.image}`} alt={item.name} className="w-20 mr-3 rounded-xl" />

                                    {/* Details */}
                                    <div className="flex-1">
                                        <h2 className="text-lg">{item.name}</h2>
                                        <p className="font-bold text-xl">${item.price}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <button className="bg-gray-300 rounded-full py-1 px-3 hover:opacity-80" onClick={() => handleDecreaseCart(item)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="bg-gray-300 rounded-full py-1 px-3 hover:opacity-80" onClick={() => handleIncreaseCart(item)}>+</button>
                                        </div>
                                        <button className="bg-red-400 py-1 px-3 rounded-xl text-white hover:opacity-80" onClick={() => handleRemoveFromCart(item)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Side Panel */}
                    <div className="flex-1">
                        <div className="p-3 rounded-xl shadow-lg">
                            <div className="flex justify-between mb-1">
                                <span>Subtotal</span>
                                <span>${orderSummary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>Shipping</span>
                                <span>${orderSummary.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-3">
                                <span>Total</span>
                                <span className="font-bold text-lg">${total.toFixed(2)}</span>
                            </div>
                            <div className="text-center px-3 py-1 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl"><button onClick={handleContinue}>Continue to checkout</button></div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckOut;