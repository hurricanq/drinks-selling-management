import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
    items: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
    quantity: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const {productId, image, name, price, quantity} = action.payload
            const indexProductId = (state.items).findIndex(item => item.productId === productId)

            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += 1
                toast.info("Product quantity increased!", {
                    position: "top-center"
                })
            } else {
                state.items.push({productId, image, name, price, quantity})
                toast.success("Product added!", {
                    position: "top-center"
                })
            }

            localStorage.setItem('items', JSON.stringify(state.items))
        },
        changeQuantity(state, action) {
            const {productId, quantity} = action.payload
            const indexProductId = (state.items).findIndex(item => item.productId === productId)

            if (quantity > 0) {
                state.items[indexProductId].quantity = quantity
            } else {
                state.items = (state.items).filter(item => item.productId !== productId)
            }
        },
        removeFromCart(state, action) {
            const nextCartItems = state.items.filter(
                (cartItem) => cartItem.productId !== action.payload.productId
            );
      
            state.items = nextCartItems;
            localStorage.setItem('items', JSON.stringify(state.items))
      
            toast.error("Product removed from cart", {
                position: "top-center",
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.items.findIndex(
                (item) => item.productId === action.payload.productId
            );
      
            if (state.items[itemIndex].quantity > 1) {
                state.items[itemIndex].quantity -= 1;
      
                toast.info("Decreased product quantity", {
                    position: "top-center",
                });
            } else if (state.items[itemIndex].quantity === 1) {
                const nextCartItems = state.items.filter(
                    (item) => item.productId !== action.payload.productId
                );
        
                state.items = nextCartItems;
        
                toast.error("Product removed from cart", {
                    position: "top-center",
                });
            }
      
            localStorage.setItem("items", JSON.stringify(state.items));
        },
        clearCart(state, action) {
            state.items = [];      
            toast.error("Cart Cleared!", {
                position: "top-center",
            });

            localStorage.setItem('items', JSON.stringify(state.items))
        },
        getTotals(state, action) {
            let {total, quantity} = state.items.reduce((cartTotal, cartItem) => {
                const {price, quantity} = cartItem;
                const itemTotal = price * quantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += quantity;

                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            });

            state.quantity = quantity;
            state.totalAmount = total;
        }
    }
})

export const { addToCart, changeQuantity, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;