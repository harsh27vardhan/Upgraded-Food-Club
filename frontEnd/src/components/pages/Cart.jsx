import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, setCart } from '../../features/cart/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.items);
    const dispatch = useDispatch();
    const userId = localStorage.getItem("_id");
    console.log(userId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/cart/${userId}`)
                console.log(response);
                dispatch(setCart(response.data.items));
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [dispatch, userId]);

    const handleRemoveItem = async (foodId) => {
        try {
            const response = await axios.delete(`http://localhost:3030/cart/${userId}/${foodId}`);
            cosnole.log(response);
            dispatch(removeFromCart(foodId));
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="flex flex-col w-full my-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div
                        key={item.foodId}
                        className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
                            <p className="text-gray-600">Price: <span className="font-medium">${item.price}</span></p>
                            <p className="text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item.foodId)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600 text-lg">Your cart is empty. Add some items!</p>
            )}
        </div>

    )
}

export default Cart
