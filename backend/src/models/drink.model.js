import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            required: true,
        },
    }, {
        timestamps: true
    }
);

const drinkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        isBestSelling: {
            type: Boolean,
            default: false,
        },
        categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
        avgRating: {
            type: Number,
            default: 0
        },
        numRatings: {
            type: Number,
            default: 0
        },
        ratings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                rating: {
                    type: Number,
                    required: true
                },
            },
        ],
        numReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            reviewSchema
        ],
    }, {
        timestamps: true
    }
  );
  
const Drink = mongoose.model("Drink", drinkSchema);
  
export default Drink;