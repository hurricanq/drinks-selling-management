import Drink from "../models/drink.model.js";
import cloudinary from "../config/cloudinary.js";

export const getAllDrinks = async (req, res) => {
    try {
        const drinks = await Drink.find({});
        res.json({ drinks });
    } catch (error) {
        console.error("Error in getAllDrinks controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getDrink = async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);
        res.json({ drink });
    } catch (error) {
        console.error("Error in getAllDrinks controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createDrink = async (req, res) => {
    try {
        const { name, description, price, image, categoryId } = req.body;
        
        const drink = await Drink.create({
            name,
			description,
			price,
			image,
			categoryId,
        });
        res.status(200).json({ status: "Successful", data: { drink } });
    } catch (error) {
        console.error("Error in createDrink controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getDrinksByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const drinks = await Drink.find({ category });
		res.json({ drinks });
	} catch (error) {
		console.log("Error in getDrinksByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteDrink = async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);

        if (!drink) {
            return res.status(404).json({ message: "Drink not found." });
        }

        if (drink.image) {
			const publicId = drink.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`drinks/${publicId}`);
				console.log("Deleted image from Cloudinary.");
			} catch (error) {
				console.log("Error deleting image from Cloudinary.", error);
			}
		}

        await Drink.findByIdAndDelete(req.params.id);
        res.json({ message: "Drink deleted successfully." });
    } catch (error) {
        console.error("Error in deleteDrink controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const rateDrink = async (req, res) => {
    const { rating } = req.body;
    const drink = await Drink.findById(req.params.id);
  
    if (drink) {
        // Check if user already rated
        const existingRating = drink.ratings.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
  
        if (existingRating) {
            // Update existing rating
            existingRating.rating = Number(rating);
        } else {
            // Add new rating
            drink.ratings.push({ user: req.user._id, rating: Number(rating) });
            drink.numRatings = drink.ratings.length;
        }
  
        // Recalculate average rating
        drink.avgRating =
            drink.ratings.reduce((acc, item) => item.rating + acc, 0) /
            drink.ratings.length;
  
        await drink.save();
        res.status(201).json({ message: "Rating submitted", avgRating: drink.avgRating });
    } else {
        res.status(404).json({ message: "Drink not found" });
    }
}