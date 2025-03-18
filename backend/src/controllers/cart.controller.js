import Drink from "../models/drink.model.js";

export const getCartDrinks = async (req, res) => {
	try {
		const drinks = await Drink.find({ _id: { $in: req.user.cartItems } });

		// add quantity for each product
		const cartItems = drinks.map((drink) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === drink.id);
			return { ...drink.toJSON(), quantity: item.quantity };
		});

		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartDrinks controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const { drinkId } = req.body;
		const user = req.user;

		const existingItem = user.cartItems.find((item) => item.id === drinkId);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			user.cartItems.push(drinkId);
		}

		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const { drinkId } = req.body;
		const user = req.user;
		if (!drinkId) {
			user.cartItems = [];
		} else {
			user.cartItems = user.cartItems.filter((item) => item.id !== drinkId);
		}
		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: drinkId } = req.params;
		const { quantity } = req.body;
		const user = req.user;
		const existingItem = user.cartItems.find((item) => item.id === drinkId);

		if (existingItem) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter((item) => item.id !== drinkId);
				await user.save();
				return res.json(user.cartItems);
			}

			existingItem.quantity = quantity;
			await user.save();
			res.json(user.cartItems);
		} else {
			res.status(404).json({ message: "Drink not found" });
		}
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};