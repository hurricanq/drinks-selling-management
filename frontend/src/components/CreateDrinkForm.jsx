import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";

import { useDrinkStore } from "../stores/useDrinkStore";
import { useCategoryStore } from "../stores/useCategoryStore";

const CreateDrinkForm = () => {
    const { createDrink, loading } = useDrinkStore();
    const { categories, fetchAllCategories } = useCategoryStore();

    useEffect(() => {
		fetchAllCategories();
	}, [fetchAllCategories]);

    const [newDrink, setNewDrink] = useState({
		name: "",
		description: "",
		price: "",
		image: "",
        categoryId: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createDrink(newDrink);
			setNewDrink({ name: "", description: "", price: "", image: "", categoryId: "" });
		} catch {
			console.log("Error creating a new drink");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewDrink({ ...newDrink, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

    return (
		<motion.div
			className='bg-brown-400 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-white'>Create Drink</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-white'>
						Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newDrink.name}
						onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })}
						className='mt-1 block w-full bg-primary-text border border-brown-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-brown-500 focus:border-brown-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-white'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newDrink.description}
						onChange={(e) => setNewDrink({ ...newDrink, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full bg-primary-text border border-brown-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brown-500 
						 focus:border-brown-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-white'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newDrink.price}
						onChange={(e) => setNewDrink({ ...newDrink, price: e.target.value })}
						step='0.1'
						className='mt-1 block w-full bg-primary-text border border-brown-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brown-500
						 focus:border-brown-500'
						required
					/>
				</div>

                {/*
				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-blue-700 py-2 px-3 border border-blue-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>
					{newDrink.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded successfully</span>}
				</div>
                */}

<div>
				<label htmlFor='image' className='block text-sm font-medium text-white'>
					File name of image
				</label>
					<input
						type='text'
						id='image'
						name='image'
						value={newDrink.image}
						onChange={(e) => setNewDrink({ ...newDrink, image: e.target.value })}
						className='mt-1 block w-full bg-primary-text border border-brown-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-brown-500 focus:border-brown-500'
						required
					/>
				</div>

                <div>
					<label htmlFor='category' className='block text-sm font-medium text-white'>
						Category
					</label>
					<select
						id='category'
						name='category'
						value={newDrink.categoryId}
						onChange={(e) => setNewDrink({ ...newDrink, categoryId: e.target.value })}
						className='mt-1 block w-full bg-primary-text border border-brown-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-brown-500 focus:border-brown-500'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Drink
						</>
					)}
				</button>
			</form>
		</motion.div>
    )
}

export default CreateDrinkForm
