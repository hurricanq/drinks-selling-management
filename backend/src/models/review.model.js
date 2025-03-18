import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        drink: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drink",
            required: true,
        },
    }, {
        timestamps: true
    }
);
  
const Review = mongoose.model("Review", reviewSchema);
  
export default Review;