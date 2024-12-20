import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';

function FoodCard({ food }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div
            key={food._id}
            className="food-card flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 w-[300px]"
            onClick={(e) => {
                // navigate(`/food/${food.id}`);
                console.log("Food card is Clicked...");
                //navigate to foodSearch
                e.preventDefault();
                // navigate(`http:localhost:3030/food/food-item/${food._id}`, { replace: true });
                navigate(`/foodItem/${food._id}`);
                // console.log(food);
            }}
        >
            {/* Food Image */}
            <img
                src={food.image}
                alt={food.name}
                className="w-full object-cover"
            />

            <div className="p-4 flex flex-col gap-2">
                {/* Food Name */}
                <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>

                {/* Category Badge */}
                <span
                    className={`inline-block w-max px-3 py-1 text-xs font-semibold rounded-full ${food.isVeg === "true" ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                >
                    {food.isVeg === "true" ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2">{food.description}</p>

                <div className="flex justify-between items-center mt-4">
                    {/* Price */}
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-purple-900">${food.price}</span>
                        {food.discount > 0 && (
                            <span className="text-xs text-red-500">Discount: {food.discount}%</span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                        <span>⭐</span>
                        <span className="text-sm font-semibold text-gray-700">{food.rating}</span>
                    </div>
                </div>

                {/* Available Quantity */}
                <p className="text-sm text-gray-500">Available: {food.availableQty} items</p>

                {/* View Details Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart({ ...food, foodId: food._id }));
                        alert("Food Item Added!");
                        navigate("/cart");
                        // navigate(`/food/${food.id}`);
                    }
                    }
                    className="mt-4 bg-[#ffc47b] text-center py-2 rounded-lg hover:bg-[#ffbe6f] transition-all duration-300 text-black"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default FoodCard;
