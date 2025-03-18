import React, { useState, useEffect } from 'react';

import { useCategoryStore } from "../stores/useCategoryStore";

import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
    const { fetchAllCategories, categories, isLoading } = useCategoryStore();
    const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		fetchAllCategories();
	}, [fetchAllCategories]);

    return (
        <Card className="lg:h-[calc(100vh-2rem)] w-full lg:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Categories
                </Typography>
            </div>
            <List>
                {!isLoading && categories.map((category) => {
                    return (
                        <ListItem
                            key={category._id}
                            className={`${
                                selectedCategory === category._id
                                    ? "bg-blue-500 text-white" // Highlighted style
                                    : "hover:bg-gray-200"
                                }`}
                            onClick={() => setSelectedCategory(category._id)}
                        >
                            <ListItemPrefix>
                                <HeartIcon className="h-5 w-5" />
                            </ListItemPrefix>

                            {category.name}
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )
}

export default Sidebar
