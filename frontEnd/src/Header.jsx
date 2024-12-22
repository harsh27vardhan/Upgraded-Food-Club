import React, { useState } from "react";
import UserIcon from "./assets/user.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import axios from "axios";

const Header = () => {
    const [showOptions, setShowOptions] = useState(false);
    const user = localStorage.getItem('userRole');
    const navigate = useNavigate();

    const nowInMilliseconds = Date.now(); // Get milliseconds since the epoch
    const currentDate = new Date(nowInMilliseconds); // Create a Date object from the milliseconds
    const currentHour = currentDate.getHours(); // Extract the hour (0-23)
    console.log("Current Hour:", currentHour);
    console.log("Only Header is re-rendered");

    async function handleLogOutUser(e) {
        e.preventDefault();
        const res = await axios.post("https://upgraded-food-club.onrender.com/user/logout", {}, {
            withCredentials: true,
        });
        if (res.status === 200) {
            console.log(res);
            localStorage.removeItem("userRole");
            localStorage.removeItem("token");
            localStorage.removeItem("_id");
            window.location.reload();
        }
    }

    const location = useLocation();
    // console.log("Current Route:", location.pathname);
    return (
        <div className="flex flex-col items-start">
            <div className="flex w-[100vw] flex-col gap-0 p-4 justify-between shadow-lg">
                <div className="flex w-full justify-between h-[36px] items-center" >
                    <h3 className="text-3xl font-semibold ">Food Club</h3>
                    <div className="h-full flex flex-col items-end relative">
                        <div className="flex h-full gap-2 items-center">
                            {user === "CUSTOMER" ? <p className="text-[25px] cursor-pointer" onClick={() => navigate("/cart")}>🛒</p> : null}
                            <img
                                src={UserIcon}
                                alt=""
                                className="h-full aspect-square rounded-[50%] bg-white cursor-pointer"
                                onClick={() => setShowOptions(!showOptions)}
                            />
                        </div>
                        {showOptions && <div className="flex flex-col p-4 rounded-lg shadow-red-300 shadow-lg bg-white z-[1] gap-2 border-2 border-red-500 fixed top-14">
                            <button className="border-2 border-black p-1 rounded-md">Get All Foods</button>
                            <form onSubmit={handleLogOutUser} className="w-full">
                                <button type="submit" className="border-2 border-black p-1 rounded-md w-full">Log out</button>
                            </form>
                        </div>}
                    </div>
                </div>
            </div >
            {
                location.pathname === "/" &&
                <div className="flex flex-col p-4">
                    <h3 className="text-[1.3rem] font-semibold">Hello {user === "CUSTOMER" ? "User" : "Restro"}! 👋</h3>
                    {user === "CUSTOMER" && <p>It's {currentHour <= 11 ? "Breakfast" : currentHour <= 15 ? "Lunch" : currentHour <= 20 ? "Snacks" : "Dinner"} time!</p>}
                </div>
            }
        </div >
    )
};

export default Header;
