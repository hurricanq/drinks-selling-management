import { create } from "zustand";
import axios from "../config/axios";
import toast from "react-hot-toast";

export const useDrinkStore = create((set) => ({
	drinks: [],
	drink: [],
	reviews: [],
	loading: false,
	sortBy: "name-asc", // Default sort by name ascending

	setDrinks: (drinks) => set({ drinks }),
	
	createDrink: async (drinkData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/drinks", drinkData);
			set((prevState) => ({
				drinks: [...prevState.drinks, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchAllDrinks: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/drinks");
			set({ drinks: response.data.drinks, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch drinks", loading: false });
			toast.error(error.response.data.error || "Failed to fetch drinks");
		}
	},

	fetchDrink: async (id) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/drinks/drink/${id}`);
			set({ drink: response.data.drink, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch drinks", loading: false });
			toast.error(error.response.data.error || "Failed to fetch drinks");
		}
	},

	fetchDrinksByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/drinks/category/${category}`);
			set({ drinks: response.data.drinks, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch drinks", loading: false });
			toast.error(error.response.data.error || "Failed to fetch drinks");
		}
	},
	
	deleteDrink: async (drinkId) => {
		set({ loading: true });
		try {
			await axios.delete(`/drinks/${drinkId}`);
			set((prevDrinks) => ({
				drinks: prevDrinks.drinks.filter((drink) => drink._id !== drinkId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete drink");
		}
	},

	fetchReviews: async (drinkId) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/drinks/drink/${drinkId}`);
			set({ reviews: response.data.drink.reviews, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch reviews", loading: false });
			toast.error(error.response.data.error || "Failed to fetch drinks");
		}
	},

	createReview: async (drinkId, reviewData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`/drinks/drink/${drinkId}/review`, reviewData);
			console.log(res.data)
			set((prevState) => ({
				reviews: [...prevState.reviews, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	sortDrinks: (sortOption) => {
		set((state) => {
			const sortedDrinks = [...state.drinks];
			
			switch (sortOption) {
				case "name-asc":
					sortedDrinks.sort((a, b) => a.name.localeCompare(b.name));
					break;
				case "name-desc":
					sortedDrinks.sort((a, b) => b.name.localeCompare(a.name));
					break;
				case "price-asc":
					sortedDrinks.sort((a, b) => a.price - b.price);
					break;
				case "price-desc":
					sortedDrinks.sort((a, b) => b.price - a.price);
					break;
				default:
					break;
			}
			
			return { drinks: sortedDrinks, sortBy: sortOption };
		});
	},
}));