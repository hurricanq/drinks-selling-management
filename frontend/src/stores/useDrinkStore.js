import { create } from "zustand";
import axios from "../config/axios";
import toast from "react-hot-toast";

export const useDrinkStore = create((set) => ({
	drinks: [],
	drink: [],
	loading: false,

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
	}
}));