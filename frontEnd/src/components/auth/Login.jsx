import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
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
            console.log(error);
        }
    }
    return (
        <div className="flex h-[100vh] justify-center w-full items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>
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
