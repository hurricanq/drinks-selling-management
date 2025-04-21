import React, { useState, useEffect } from 'react'
import { PlusCircle, ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";

import CreateDrinkForm from "../components/CreateDrinkForm";
import DrinksList from "../components/DrinksList";

import { useDrinkStore } from "../stores/useDrinkStore";

const tabs = [
	{ id: "create", label: "Create Drinks", icon: PlusCircle },
	{ id: "drinks", label: "Drinks", icon: ShoppingBasket },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
	const { fetchAllDrinks } = useDrinkStore();

	useEffect(() => {
		fetchAllDrinks();
	}, [fetchAllDrinks]);

    return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-12'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-emerald-400 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='flex justify-center mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-brown-400 text-white"
									: "bg-primary-text text-gray-300 hover:bg-brown-600"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "create" && <CreateDrinkForm />}
				{activeTab === "drinks" && <DrinksList />}
			</div>
		</div>
    )
}

export default AdminPage
