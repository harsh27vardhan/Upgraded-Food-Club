import React, { useEffect, useState } from "react";
import SearchIcon from "./assets/search.svg";
import AppetizerImg from "./assets/appetizer.webp";
import MainCourse from "./assets/main-course.jpeg";
import FastFoodImg from "./assets/fastfood.jpeg";
import SaladImg from "./assets/salad.jpeg";
import DrinkImg from "./assets/drinks.webp";
import DessertImg from "./assets/desserts.webp";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import FoodCard from "./components/products/FoodCard";

const UserPage = ({ city }) => {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    async function fetchDataByName(text = "") {
        if (text === "") {
            console.log("Pleave give a text");
            console.log(localStorage.getItem("token"));
            //Fetch all the food items from the database
            const response = await axios.get(
                "https://upgraded-food-club.onrender.com/food",
                {
                    withCredentials: true,
                }
            );
            console.log(response);
            setFoods(response.data.food);
            const cartResponse = await axios.get(
                `https://upgraded-food-club.onrender.com/cart/${localStorage.getItem(
                    "_id"
                )}`
            );
            console.log(cartResponse);
        } else {
            console.log(text);
            //Fetch data from the database according to the text
            // const response = await axios.get(`https://upgraded-food-club.onrender.com/food/search/${text}`);
            // console.log(response);
            navigate(`/search/${text}`);
        }
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        const text = document.querySelector("#userpage-search-input").value;
        if (text) {
            console.log(text);
            fetchDataByName(text);
            // fetch the data of the food according to the text and redirect it to that page containing that types of food.
        }
    }

    function handleClickToSearch(e) {
        const text = e.target.innerText || e.target.alt; //Will give the text according to our requirement
        console.log(text);
        fetchDataByName(text);
        // fetch the data of the food according to the text and reedirect it to that page containing that types of food.
    }
    useEffect(() => {
        fetchDataByName();
    }, [foods]);

    console.log("Complete page re-rendered");
    return (
        <div className="w-full h-[100vh] flex flex-col gap-8">
            <div id="user-head-div" className="flex flex-col gap-8">
                <Header />
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex h-8 gap-2 items-center px-4"
                >
                    <button type="submit" className="h-full">
                        <img src={SearchIcon} alt="" className="h-full" />
                    </button>
                    <label className="text-[#ffd7a7]">|</label>
                    <input
                        type="text"
                        id="userpage-search-input"
                        placeholder="What would you like to eat?"
                        className="flex-1 bg-transparent outline-none h-8"
                    />
                </form>
            </div>

            {city && city !== "Unknown Location" && (
                <h2 className="margin-auto text-3xl font-sans font-bold mx-4">
                    Some Really good foods to eat in the City of {city}
                </h2>
            )}

            <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold px-4">Choose Category</p>
                <div className="flex flex-wrap w-full justify-evenly">
                    {[
                        { img: MainCourse, title: "Main" },
                        { img: AppetizerImg, title: "Appetizer" },
                        { img: DrinkImg, title: "Drinks" },
                        { img: DessertImg, title: "Dessert" },
                        { img: FastFoodImg, title: "Fast Food" },
                        { img: SaladImg, title: "Salad" },
                    ].map((item, index) => (
                        <div
                            className="user-food-category-cont flex flex-col w-[12%] items-center gap-2"
                            onClick={handleClickToSearch}
                            key={index}
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-[100%] aspect-square rounded-[50%]"
                            />
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 p-4">
                <p className="text-xl font-semibold">Explore Other Options</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[
                        { name: "Biryani", image: "bBiryani.jpg" },
                        { name: "Burger", image: "Burger.jpg" },
                        { name: "Cafe", image: "Cafe.jpg" },
                        { name: "Chinese", image: "Chinese.jpg" },
                        { name: "Coffee", image: "Coffee.jpg" },
                        { name: "Ice Cream", image: "Icecream.jpg" },
                        { name: "Italian", image: "Italian.jpg" },
                        { name: "North Indian", image: "Northindian.jpg" },
                        { name: "Pasta", image: "Pasta.jpg" },
                        { name: "Pizza", image: "Pizza.jpg" },
                        { name: "Rolls", image: "Rolls.jpg" },
                        { name: "Shake", image: "Shake.jpg" },
                        { name: "South Indian", image: "Southindian.jpg" },
                        { name: "Street", image: "Street.jpg" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            onClick={handleClickToSearch}
                            className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-lg cursor-pointer transition-shadow"
                        >
                            <img
                                src="" // Replace with your image directory
                                alt={item.name}
                                className="w-[50%] aspect-video object-cover rounded-md"
                            />
                            <p className="mt-2 text-center text-gray-800 font-medium">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-xl font-semibold px-4">Popular Foods</p>
            <div className="flex flex-wrap gap-4 items-center justify-center p-2">
                {foods &&
                    foods.length > 0 &&
                    foods.map((food, index) => <FoodCard food={food} key={index} />)}
            </div>
        </div>
    );
};

export default UserPage;
