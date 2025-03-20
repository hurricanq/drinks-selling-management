import React from 'react';
import { Link } from "react-router-dom";

import { useCategoryStore } from "../stores/useCategoryStore";
import { useDrinkStore } from "../stores/useDrinkStore";

const Breadcrumb = () => {
    const { categories } = useCategoryStore();
    const { drink } = useDrinkStore();

    return (
        <nav aria-label="breadcrumb" class="w-max">
            <ol class="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
                <li class="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                    <Link to="/menu">Menu</Link>
                    <span class="pointer-events-none mx-2 text-slate-800">
                        /
                    </span>
                </li>
                <li class="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                    <p>{drink.name}</p>
                </li>
            </ol>
        </nav>
    )
}

export default Breadcrumb
