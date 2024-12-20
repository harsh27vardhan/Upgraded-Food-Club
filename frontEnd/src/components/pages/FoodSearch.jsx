import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';

const FoodSearch = () => {
    const { searchStr } = useParams();
    const [foods, setFoods] = useState(null);
    async function searchFoodItems() {
        const response = await axios.get(`http://localhost:3030/food/search/${searchStr}`);
        console.log(response);
        if (response.status === 200) {
            setFoods(response.data);
        }
    }
    useEffect(() => {
        searchFoodItems();
    }, [searchStr]);
    const dispatch = useDispatch();
    return foods ? (
        <div className='flex flex-wrap gap-4 p-4'>
            {foods.map((food) => (
                <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white mx-auto">
                    <div className="relative">
                        <img
                            src={food.image || "https://via.placeholder.com/350x200"}
                            alt={food.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
                            Free delivery
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-2xl font-bold">{food.name}</h3>
                        <p className="text-gray-500">{food.category || "Food Category"}</p>

                        <div className="flex justify-between items-center my-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <span>⭐ {food.rating || 0}</span>
                                {/* Reviews will come here */}
                            </div>
                            <span>{15} min Delivery</span>
                        </div>

                        <p className="text-gray-600 text-sm mb-3">
                            {food.description || "No description available."}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xl font-bold text-gray-800">
                                ₹{food.price}
                            </p>
                            <button
                                className="bg-[#ffc47b] text-black font-medium px-4 py-2 rounded-lg hover:bg-[#ffbe6f] transition"
                                onClick={() => {
                                    console.log("Order Button Clicked");
                                    dispatch(addToCart({ ...food, foodId: food._id }));
                                    alert("Food Item Added!");
                                    navigate("/cart");
                                }}
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
        : (<div>
            No foods found with the given search query.
        </div>)
}

export default FoodSearch
