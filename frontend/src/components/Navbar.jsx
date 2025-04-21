import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import SlideOverCart from "./SlideOverCart";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Menu', href: '/menu', current: false },
    { name: 'Contact', href: '/contact', current: false },
    { name: 'About Us', href: '/about', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const { user, logout } = useUserStore();
    const { cart, toggleCart } = useCartStore();

	const isAdmin = user?.role === "admin";

    return (
        <Disclosure as="nav" className="shadow-sm">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary-text hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    
                    <div className="flex flex-1 items-center justify-center sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/">
                                <img
                                    alt="Your Company"
                                    src="../assets/logo.png"
                                    className="h-12 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                        item.current ? 'bg-primary-text text-white' : 'hover:bg-primary-text hover:text-white transition-colors',
                                        'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
							<Link
								className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/admin"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

                    <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        { user ? (
                            <>
                                {/* Cart */}
                                <button
                                    type="button"
                                    className="relative rounded-full bg-primary-text p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                    onClick={toggleCart}
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Cart</span>
                                    <ShoppingCartIcon aria-hidden="true" className="size-6" />

                                    {cart.length > 0 && (
                                        <span
                                            className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
                                        text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
                                        >
                                            {cart.length}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications */}
                                <button
                                    type="button"
                                    className="relative rounded-full bg-primary-text p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button>
                                
                                {/* Profile Dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src={user.profilePic}
                                                className="size-8 rounded-full"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Your Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                                onClick={logout}
                                            >
                                                Log Out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="bg-primary-text px-5 py-2 rounded-xl text-white flex items-center gap-2 hover:opacity-70 transition-opacity">
                                        Log in 
                                    </button> 
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>

            <SlideOverCart />
        </Disclosure>
    )
}

export default Navbar
