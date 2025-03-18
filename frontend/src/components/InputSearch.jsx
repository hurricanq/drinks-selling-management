import React from 'react';

import { useSearchStore } from "../stores/useSearchStore";

const InputSearch = () => {
    const { searchQuery, setSearchQuery } = useSearchStore();

    return (
        <div class="w-full max-w-sm min-w-[200px]">
            <input
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search for a drink..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default InputSearch
