import { create } from "zustand";
import axios from "../config/axios";
import toast from "react-hot-toast";

export const useCategoryStore = create((set) => ({
    categories: [],
	selectedCategory: [{ _id: "67dbdcc04a75c342d13df9b6", name: "Coffee"}],
    loading: false,

	setCategories: (categories) => set({ categories }),

	createCategory: async (categoryData) => {
	    set({ loading: true });
		try {
			const res = await axios.post("/categories", categoryData);
			set((prevState) => ({
				categories: [...prevState.categories, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchAllCategories: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/categories");
			set({ categories: response.data.categories, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch categories", loading: false });
			toast.error(error.response.data.error || "Failed to fetch categories");
		}
	},

	deleteCategory: async (categoryId) => {
		set({ loading: true });
		try {
			await axios.delete(`/categories/${categoryId}`);
			set((prevCategories) => ({
				categories: prevCategories.categories.filter((category) => category._id !== categoryId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete category");
		}
	},

	setSelectedCategory: (category) => set({ selectedCategory: category }),
}));