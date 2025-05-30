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
        console.error("Error in getDrink controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createDrink = async (req, res) => {
    try {
        const { name, description, price, image, categoryId } = req.body;

        let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "drinks" });
		}
        
        const drink = await Drink.create({
            name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			categoryId,
        });
        res.status(200).json({ status: "Successful", data: { drink } });
    } catch (error) {
        console.error("Error in createDrink controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getDrinksByCategory = async (req, res) => {
	const { categoryId } = req.params;

	try {
		const drinks = await Drink.find({ categoryId })
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

// API for Rating
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

// API for Reviews
export const getAllReviews = async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);

        if (drink) {
            res.json({ reviews: drink.reviews });
        } else {
            res.status(404).json({ message: "Drink not found." });
        }
    } catch (error) {
        console.error("Error in getAllReviews controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createReview = async (req, res) => {
    try {
        const { content } = req.body;
        const drink = await Drink.findById(req.params.id);

        if (drink) {
            const review = {
                user: req.user._id,
                username: req.user.username,
                profilePic: req.user.profilePic,
                content,
            };

            drink.reviews.push(review);
            drink.numReviews = drink.reviews.length;
        
            await drink.save();
            res.status(201).json({ message: "Review added." });
        }
    } catch (error) {
        console.error("Error in createReview controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.drinkId);

        if (!drink) {
          return res.status(404).json({ message: "Drink not found." });
        }
    
        // Find the review
        const reviewIndex = drink.reviews.findIndex(
          (r) => r._id.toString() === req.params.reviewId
        );
    
        if (reviewIndex === -1) {
          return res.status(404).json({ message: "Review not found." });
        }
    
        // Remove the review
        drink.reviews.splice(reviewIndex, 1);
        drink.numReviews = drink.reviews.length;
    
        await drink.save();
        res.json({ message: "Review deleted successfully" })
    } catch (error) {
        console.error("Error in deleteReview controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}