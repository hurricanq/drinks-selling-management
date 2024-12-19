import React, { useState, useEffect } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigation = [
        { name: 'Menu', href: '/products', current: props.isMenu },
        { name: 'Contact', href: '/contact', current: props.isContact },
        { name: 'About Us', href: '#', current: props.isAbout }
    ]

    const [totalQuantity, setTotalQuantity] = useState(0)

    const carts = useSelector(store => store.cart.items)
    console.log(carts)

    useEffect(() => {
        let total = 0
        carts.forEach(item => total += item.quantity)
        setTotalQuantity(total)
    }, [carts])

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/checkout")
    }

    return (
        <div>
            <Disclosure as="nav" className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <a href="/">
                                <img src="./assets/mangosteen.png" alt="Logo" className="h-8 w-auto"/>
                            </a>
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
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* cart */}
                        <div className='w-10 h-10 mx-6 bg-gray-100 rounded-full flex justify-center items-center relative cursor-pointer'>
                            <img src="./assets/cart.png" alt="" className='w-6 hover:opacity-50 transition-colors' onClick={handleNavigate}/>
                            <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
                            w-5 h-5 rounded-full flex justify-center items-center'>{totalQuantity}</span>
                        </div>
                        <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                        <div>
                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src="./assets/pfp.jpg"
                                className="size-8 rounded-full"
                            />
                            </MenuButton>
                        </div>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <MenuItem>
                            <a
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            >
                                Your Profile
                            </a>
                            </MenuItem>
                            <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            >
                                Log Out
                            </a>
                            </MenuItem>
                        </MenuItems>
                        </Menu>
                    </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
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
            </Disclosure>   
        </div>
    )
}

export default Navbar
