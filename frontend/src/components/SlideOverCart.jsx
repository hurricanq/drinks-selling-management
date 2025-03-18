'use client'

import React from 'react';
import { Link } from "react-router-dom";

import { useCartStore } from "../stores/useCartStore";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import toast from "react-hot-toast";

const SlideOverCart = () => {
    const { cart, subtotal, isOpen, removeFromCart, updateQuantity, toggleCart } = useCartStore();

    return (
        <Dialog open={isOpen} onClose={toggleCart} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />
    
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-bold text-gray-900">Cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={toggleCart}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>
            
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            {cart.length === 0 ? (
                                                <div className="text-center">Your cart is empty!</div>
                                            ) : (
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {cart.map((item) => (
                                                        <li key={item._id} className="flex py-6">
                                                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img alt={item.name} src={`../assets/${item.image}`} className="size-full object-cover" />
                                                            </div>
                                
                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">{item.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">${item.price}</p>
                                                                </div>
                                                                    <p className="mt-1 text-sm text-gray-500">Size L</p>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    {/* Quantity, Add/Drop Quantity Buttons */}
                                                                    <div className="flex items-center gap-3">
                                                                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                                                                        <button
                                                                            className="bg-gray-400 w-8 p-1 rounded-xl font-bold"
                                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                                        >
                                                                            +
                                                                        </button>
                                                                        <button
                                                                            className="bg-gray-400 w-8 p-1 rounded-xl font-bold"
                                                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                                        >
                                                                            -
                                                                        </button>
                                                                    </div>

                                                                    {/* Remove Button */}
                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            onClick={() => removeFromCart(item._id)}
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {cart.length && (
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${subtotal}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            <Link
                                                to="/checkout"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default SlideOverCart
