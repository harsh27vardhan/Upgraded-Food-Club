import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setCart } from '../../features/cart/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.items);
    const dispatch = useDispatch();
    const userId = localStorage.getItem("_id");
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/cart/${userId}`);
                dispatch(setCart(response.data.items));
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [dispatch, userId]);

    const calculateTotalCartPrice = (items) => {
        return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    useEffect(() => {
        setTotalCartPrice(calculateTotalCartPrice(cartItems));
    }, [cartItems]);

    const handleRemoveItem = async (foodId) => {
        try {
            await axios.delete(`http://localhost:3030/cart/${userId}/${foodId}`);
            dispatch(removeFromCart(foodId));
        } catch (err) {
            console.log(err);
        }
    };

    const handleQuantityChange = async (foodId, newQuantity) => {
        try {
            await axios.patch(`http://localhost:3030/cart/${userId}/${foodId}`, {
                quantity: newQuantity,
            });
            const updatedCartItems = cartItems.map((item) =>
                item.foodId === foodId ? { ...item, quantity: newQuantity } : item
            );
            dispatch(setCart(updatedCartItems));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col w-full my-4 p-4 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Your Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div
                        key={item.foodId}
                        className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 mb-4 transition-transform transform "
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-2xl font-semibold text-gray-700">{item.name}</h3>
                            <p className="text-gray-600">
                                Price: <span className="font-medium">${item.price.toFixed(2)}</span>
                            </p>
                            <div className="flex items-center mt-2">
                                <button
                                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() =>
                                        handleQuantityChange(
                                            item.foodId,
                                            Math.max(item.quantity - 1, 1)
                                        )
                                    }
                                >
                                    -
                                </button>
                                <span className="mx-2 text-gray-700 font-semibold">{item.quantity}</span>
                                <button
                                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() =>
                                        handleQuantityChange(item.foodId, item.quantity + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item.foodId)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        >
                            🗑️
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600 text-lg">Your cart is empty. Add some items!</p>
            )}
            {cartItems.length > 0 && (
                <>
                    <div className="text-xl font-bold text-gray-800 mt-4">
                        Total Price: <span className="text-green-500">${totalCartPrice}</span>
                    </div>
                    <button className="m-8 border border-black w-fit mx-auto p-2 text-xl rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
                        Place Order
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;