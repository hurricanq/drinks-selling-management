import React from 'react'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useDrinkStore } from '../stores/useDrinkStore'

const SortByDropdown = () => {
    const { sortDrinks, sortBy } = useDrinkStore();

    const handleSort = (sortOption) => {
        sortDrinks(sortOption);
    };

    const getSortLabel = () => {
        switch (sortBy) {
            case "name-asc":
                return "Name: A-Z";
            case "name-desc":
                return "Name: Z-A";
            case "price-asc":
                return "Price: Low to High";
            case "price-desc":
                return "Price: High to Low";
            default:
                return "Sort By";
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                    {getSortLabel()}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>
    
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
            <div className="py-1">
                <MenuItem>
                    <button
                        onClick={() => handleSort("name-asc")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                        Name: A-Z
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={() => handleSort("name-desc")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                        Name: Z-A
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={() => handleSort("price-desc")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                        Price: High to Low
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={() => handleSort("price-asc")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                        Price: Low to High
                    </button>
                </MenuItem>
            </div>
            </MenuItems>
        </Menu>
    )
}

export default SortByDropdown
