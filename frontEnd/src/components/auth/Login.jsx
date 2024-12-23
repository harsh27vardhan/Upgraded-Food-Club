import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import foodBG from "../../assets/foodBG.png";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post("https://upgraded-food-club.onrender.com/user/login", formData, {
                withCredentials: true,
            });
            console.log(response);
            localStorage.setItem("_id", response.data.user._id);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userRole", response.data.user.role);
                navigate("/");
            }
        }
        catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Set the error message from the backend
            } else {
                setErrorMessage("Something went wrong. Please try again later."); // Default error message
            }
        }
    }
    return (
        <div className="flex w-full h-screen justify-center items-center"
            style={{
                backgroundImage: `url(${foodBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-lg shadow-lg w-fit max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>
                {errorMessage && ( // Display error message if exists
                    <div className="text-red-500 text-center mb-4">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-transparent text-black"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-transparent text-black"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-500 hover:underline ml-1">Sign up</Link>
                </p>
            </div>
        </div>
    );

}

export default Login
