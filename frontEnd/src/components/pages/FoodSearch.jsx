import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';

const FoodSearch = () => {
    const { searchStr } = useParams();
    const [foods, setFoods] = useState(null);
    const [filters, setFilters] = useState({
        maxPrice: 100000,
        rating: 0,
        discount: 0,
        isVeg: false,
    })
    async function searchFoodItems() {
        const response = await axios.get(`https://upgraded-food-club.onrender.com/food/search/${searchStr}`,
            {
                params: {
                    maxPrice: filters.maxPrice,
                    discount: filters.discount,
                    rating: filters.rating,
                    isVeg: filters.isVeg
                }
            });
        console.log(response);
        if (response.status === 200) {
            setFoods(response.data);
        }
    }
    useEffect(() => {
        searchFoodItems();
    }, [searchStr, filters]);

    function handleFilterChange(e) {
        const { name, value, type, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return foods ? (
        <>
            <div className="flex flex-wrap w-full gap-4 mx-4 mb-6 bg-gray-50 rounded-lg shadow-lg border border-gray-200 items-center">
                <div className="flex flex-col">
                    <label className="text-gray-600 font-semibold mb-2">Max Price:</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max Price"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-semibold mb-2">Min Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={filters.rating}
                        onChange={handleFilterChange}
                        placeholder="Minimum Rating"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-600 font-semibold mb-2">Min Discount:</label>
                    <input
                        type="number"
                        name="discount"
                        value={filters.discount}
                        onChange={handleFilterChange}
                        placeholder="Minimum Discount"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isVeg"
                        checked={filters.isVeg}
                        onChange={handleFilterChange}
                        className="w-5 h-5 accent-green-500 focus:ring-2 focus:ring-green-500 transition duration-300"
                    />
                    <label className="text-gray-600 font-semibold">Vegetarian</label>
                </div>
                {/* <button
                    className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
                    onClick={() => searchFoodItems()}
                >
                    Apply Filters
                </button> */}
            </div>
            <div className='flex flex-wrap gap-8 p-4'>
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
        </>
    )
        : (<div>
            No foods found with the given search query.
        </div>)
}

export default FoodSearch
