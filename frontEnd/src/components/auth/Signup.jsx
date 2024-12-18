import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        role: "CUSTOMER",
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        formData.role = userType;
        console.log(formData);
        try {
            const response = await axios.post(
                "http://localhost:3030/user/signup",
                formData
            );
            console.log(response);
            navigate("/login");
        }
        catch (error) {
            console.error(error);
        }
    }
    const [userType, setUserType] = useState(null);
    return (
        <div className="flex h-[100vh] justify-center w-full items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Create a New Account
                </h2>
                {userType ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your Name"
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-transparent text-black"
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-transparent text-black"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-transparent text-black"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-transparent text-black"
                            required
                        />
                        {/* <div className="flex justify-start text-black">
                            <input
                                type="checkbox"
                                id="role"
                                name="role"
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-transparent text-black"
                            />
                            <label htmlFor="restro">If you're a Restrorant?</label>
                        </div> */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            {userType === "ADMIN" ? "Signup as a Restro" : "Signup"}
                        </button>
                    </form>
                ) : (
                    <div className="flex w-full justify-center gap-8">
                        <button
                            className="bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={() => setUserType("CUSTOMER")}
                        >
                            SignUp as User
                        </button>
                        <button
                            className="bg-green-500 text-white font-semibold p-3 rounded-md hover:bg-green-600 transition duration-300"
                            onClick={() => setUserType("ADMIN")}
                        >
                            SignUp as Restro
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
