import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json({ categories });
    } catch (error) {
        console.error("Error in getAllCategories controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json({ status: "Successful", data: { category } });
    } catch (error) {
        console.error("Error in createCategory controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

		if (!category) {
			return res.status(404).json({ message: "Category not found." });
		}

        await Category.findByIdAndDelete(req.params.id);
		res.json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error in deleteCategory controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}