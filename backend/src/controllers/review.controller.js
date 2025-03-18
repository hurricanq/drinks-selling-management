import Review from "../models/review.model.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.json({ reviews });
    } catch (error) {
        console.error("Error in getAllReviews controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.json({ review });
    } catch (error) {
        console.error("Error in getReview controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createReview = async (req, res) => {
    try {
        const { content, date, userId, drinkId } = req.body;
        
        const review = await Review.create({
            content,
            date,
            userId,
            drinkId
        });
        res.status(200).json({ status: "Successful", data: { review } });
    } catch (error) {
        console.error("Error in createReview controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review deleted successfully." });
    } catch (error) {
        console.error("Error in deleteReview controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}