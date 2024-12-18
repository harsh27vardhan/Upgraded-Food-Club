import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const FoodItem = () => {
    const [food, setFood] = useState(null);
    const { foodId } = useParams();
    async function getFoodById() {
        console.log('foodId : ', foodId);
        const response = await axios.get(`http://localhost:3030/food/food-item/${foodId}`);
        console.log(response);
        setFood(response.data.food);
    }
    useEffect(() => {
        console.log('useEffect Hook is called');
        console.log(foodId);
        getFoodById();
    }, [foodId])
    //We have to add foodId as dependancy, as it is the which which is not changing and we want to extract the data only once, If we don't give the dependancy of foodId then it'll be a infinite loop.
    console.log(food);
    return (
        food && <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white mx-auto">
            {/* Food Image */}
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

            {/* Food Details */}
            <div className="p-4">
                <h3 className="text-2xl font-bold">{food.name}</h3>
                <p className="text-gray-500">{food.category || "Food Category"}</p>

                {/* Ratings and Stats */}
                <div className="flex justify-between items-center my-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <span>⭐ {food.rating || 0}</span>
                        <span className="ml-2">{Math.floor(Math.random() * 2000)} Reviews</span>
                    </div>
                    <span>{15} min Delivery</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3">
                    {food.description || "No description available."}
                </p>

                {/* Price and Order Button */}
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-gray-800">
                        ₹{food.price}
                    </p>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodItem
