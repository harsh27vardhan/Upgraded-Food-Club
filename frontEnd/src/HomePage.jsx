import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserPage from './UserPage';
import RestroHome from './RestroHome';

const HomePage = () => {
    const [city, setCity] = useState(null);
    const navigate = useNavigate();
    async function getUserCity() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lati = position.coords.latitude;
                    const longi = position.coords.longitude;
                    console.log(`Latitude: ${lati}, Longitude: ${longi}`);
                    try {
                        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lati}%2C${longi}&key=f7abc6f9ed5e46fc9b991f4a1c161750`);
                        const data = await response.json();

                        // Extract the city name from the response
                        const cityName = data.results[0]?.components?.city ||
                            data.results[0]?.components?.town ||
                            data.results[0]?.components?.village ||
                            'Unknown Location';

                        console.log('City:', cityName);
                        setCity(cityName); // Update the state to trigger re-render
                    }
                    catch {
                        console.log("Unable to fetch from the api", err);
                    }
                }, (error) => {
                    console.error("Navigator is not enabled in the Browser.");
                });
        }
        else {
            console.log("Geolocation is not supported...");
        }
    }
    useEffect(() => {
        getUserCity();
        fetchData();
    }, []);
    function handleSearchSubmit(e) {
        e.preventDefault();
        const searchQuery = document.getElementById('search-input').value;
        if (searchQuery === "" || searchQuery.trim() === "") return; //Prevents empty string queries
        fetchData(searchQuery);
    }
    async function fetchData(searchQuery) {
        //  redirect it to the page where there is fetched data and filter it.
        try {
            const response = await fetch("http://localhost:3030/food", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            });
            console.log(response);
            if (response.status !== 200) {
                navigate("/login");
            }
        }
        catch (errors) {
            console.log("Error:", errors);
            navigate("/login");
        }
    }
    console.log(document.cookie);
    const userRole = document.cookie.split("userRole=")[1];
    console.log(userRole);
    return userRole === "CUSTOMER" ? (< UserPage city={city} />) : userRole === "ADMIN" ? (< RestroHome />) : (
        <>You're an unauthorised user....</>
    );
}

export default HomePage
