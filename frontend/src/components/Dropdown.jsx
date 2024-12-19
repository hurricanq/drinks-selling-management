import React from 'react'

import { MenuItem } from '@headlessui/react'

const Dropdown = (props) => {
    return (
        <MenuItem>
            <a
                href={`#${props.categoryName}`}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
            {props.categoryName}
            </a>
        </MenuItem>
    )
}

export default Dropdown
