import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
const RestroHome = () => {
    // const [foods, setFoods] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1,]);
    const [foods, setFoods] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        isVeg: "true",
        price: 0,
        availableQty: 0,
        image: "",
        rating: 0,
        discount: 0,
    });
    const [addFoodItem, setAddFoodItem] = useState(false);
    // const [editFoodItem, setEditFoodItem] = useState(false);
    const navigate = useNavigate();
    async function getFood() {
        try {
            console.log(localStorage.getItem("_id"));
            const response = await axios.get(`https://upgraded-food-club.onrender.com/food/restro/${localStorage.getItem("_id")}`, {
                withCredentials: true, /// Have to include credentials as we're checking for the cookies in the backend..
            });
            console.log(response);
            setFoods(response.data.food);
        } catch (error) {
            console.error("Error fetching food:", error);
        }
    }
    useEffect(() => {
        // fetch foods by RestroId;
        getFood();
        //update foods
    }, []);
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    async function handleAddFormData(e) {
        e.preventDefault();
        // add food wwith the backend api
        console.log('Adding');
        //If added..remove the form and show added
        //ERROR
        try {
            const response = await axios.post("https://upgraded-food-club.onrender.com/food", formData, {
                withCredentials: true,
            });
            console.log(response);
            // alert('Added successfully');
            setAddFoodItem(false);
            setFoods([...foods, { ...response.data.food, _id: response.data.id }]);
            console.log(foods);
            // window.location.reload();
        }
        catch (err) {
            console.error(err);
        }
        // and then navigate to the restro home page
    }
    // async function handleEditFormData(food) {
    //     e.preventDefault();
    //     // add food wwith the backend api
    //     console.log('Going for the patch request from the back end...');
    //     //If added..remove the form and show added
    //     //ERROR
    //     try {
    //         // const response = await axios.post("https://upgraded-food-club.onrender.com/food", formData, {
    //         //     withCredentials: true,
    //         // });
    //         // console.log(response);

    //         // alert('Added successfully');
    //         setEditFoodItem(false);
    //         // setFoods([...foods, { ...response.data.food, _id: response.data.id }]);
    //         // window.location.reload();
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    //     // and then navigate to the restro home page
    // }


    function ProductCard({ food, key }) {
        function handleEditFoodItem() {
            console.log("Edit Food Item");
            console.log(food);
            // setEditFoodItem(true);
            // handleEditFormData(food);
            // Call the edit food item function from backend using patch request
            //Maintain the states using redux and update the todos so that the restro homepage shows the edited items
        }
        async function handleDeleteFoodItem() {
            console.log("Deleting Food Item");
            console.log(food);
            const response = await axios.delete(`https://upgraded-food-club.onrender.com/food/${food._id}`, {
                withCredentials: true,
            });
            console.log(response);
            if (response.status === 200) {
                getFood();
            }
            // Call the delete food item function from backend using delete request
            //Maintain the states using redux and update the todos so that the restro homepage shows the deleted items
        }
        return (
            <div className="flex flex-col gap-4 border bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="relative">
                    <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div
                        className={`absolute top-2 right-2 text-white text-sm px-3 py-1 rounded-md shadow-md ${food.isVeg === "true" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {food.isVeg === "true" ? "Veg" : "Non-Veg"}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold text-gray-800">{food.name}</h3>
                    <p className="text-gray-600">{food.description}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            Only <span className="font-medium text-gray-700">{food.availableQty}</span> left in stock!
                        </p>
                        <p className="text-lg font-bold text-purple-900">
                            Price: ${food.price}
                        </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="flex items-center gap-1 text-sm text-gray-600">
                            <span className="font-bold">{food.rating.toFixed(1)}</span> ⭐
                        </p>
                        {food.discount > 0 && (
                            <p className="text-sm text-green-600">
                                Discount: <span className="font-bold">{food.discount}%</span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handleEditFoodItem}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-all"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDeleteFoodItem}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>

        )
    }

    return (
        <div className="w-full h-[100vh] flex flex-col gap-8 items-center p-4 relative">
            <Header />
            <div className='flex flex-col gap-4 px-4 h-[calc(100vh - 36px)] w-full overflow-auto'>
                <div className='flex w-full justify-between pr-4'>
                    <p className="text-xl font-semibold">Here are your Food Items</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => setAddFoodItem(true)}>Add new Food Item</button>
                </div>
                {foods && <div className='flex flex-wrap justify-center gap-4'>
                    {foods.length > 0 && (
                        foods.map((food, index) => (
                            <ProductCard food={food} key={"produt-card" + index} />
                        ))
                    )}
                </div>}
            </div>
            {addFoodItem && (
                <div
                    className="flex flex-col w-full h-[100vh] gap-4 justify-center items-center bg-[#00000046] absolute top-0 left-0 z-50 px-4"
                    onClick={() => setAddFoodItem(false)}
                >
                    <div
                        className="bg-white flex flex-col justify-center items-center p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md h-[90%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Food</h2>
                        <form className="flex flex-col w-full" onSubmit={handleAddFormData}>
                            <input
                                required
                                type="text"
                                onChange={handleInputChange}
                                placeholder="Food Name"
                                name="name"
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                required
                                type="text"
                                onChange={handleInputChange}
                                placeholder="Category"
                                name="category"
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                required
                                onChange={handleInputChange}
                                placeholder="Description"
                                name="description"
                                rows={3}
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                            <select
                                name="isVeg"
                                onChange={handleInputChange}
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="true" defaultValue>
                                    Veg
                                </option>
                                <option value="false">Non-Veg</option>
                            </select>
                            <input
                                required
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Price"
                                name="price"
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                required
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Available Quantity"
                                name="availableQty"
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                onChange={handleInputChange}
                                placeholder="Image Link"
                                name="image"
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                required
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Rating"
                                name="rating"
                                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Discount"
                                name="discount"
                                className="p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-200"
                            >
                                Add Food
                            </button>
                        </form>
                    </div>
                </div>

            )}
            {/* {editFoodItem && (
                <div className='flex flex-col w-full h-[100vh] gap-4 justify-center items-center bg-[#00000046] absolute top-0 left-0' onClick={() => setEditFoodItem(false)}>
                    <div className='bg-white flex flex-col justify-center items-center p-8 rounded-md shadow-md' onClick={(e) => { e.stopPropagation() }}>
                        <h2 className='text-lg font-bold mb-4'>Edit Food</h2>
                        <form className='flex flex-col w-full' onSubmit={handleEditFormData}>
                            <input required type="text" onChange={handleInputChange} placeholder="Food Name" name='name' className='p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <input required type="text" onChange={handleInputChange} placeholder="Category" name='category' className='p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <input required type="text" onChange={handleInputChange} placeholder="Description" name="description" className='p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <select name='isVeg' id="" onChange={handleInputChange} className='p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' >
                                <option selected value="true">Veg</option>
                                <option value="false">Non-Veg</option>
                            </select>
                            <input required type="number" onChange={handleInputChange} placeholder="Price" name='price' className='p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <input required type="number" onChange={handleInputChange} placeholder="Available Qualtity" name='availableQty' className='p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <input type="text" onChange={handleInputChange} placeholder="Image link" name='image' className='p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <input required type="number" onChange={handleInputChange} placeholder="Rating" name='rating' className='p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <input type="number" onChange={handleInputChange} placeholder="Discount" name='discount' className='p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Add Food</button>
                        </form>
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default RestroHome
