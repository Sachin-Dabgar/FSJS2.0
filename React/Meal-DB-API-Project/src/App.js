import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import MealCard from "./MealCard";

const App = () => {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    const getMeals = async (url) => {
        try {
            setLoading(true);
            const result = await Axios.get(url);
            setMeals(result.data.meals);
            if (result.data.meals === null) {
                alert("Could not find meal😢, Try again!");
            }
            console.log(result.data.meals);
            setLoading(false);
        } catch (err) {
            // setMeals(false);

            setLoading(false);
        }
    };

    useEffect(() => {
        getMeals("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        getMeals();
    };

    return (
        <div className="app">
            <h1>Search Your Favourite Meal</h1>
            <p className="description">
                Welcome to <strong>TheMealDB</strong>: An open, crowd-sourced
                database of <strong>Recipes from around the world</strong>
            </p>
            <form
                className="app-form"
                onSubmit={onSubmit}
            >
                <input
                    autoFocus
                    type="text"
                    className="app-input"
                    placeholder="Search Meal..."
                    value={query.toLowerCase()}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    type="submit"
                    onClick={() =>
                        getMeals(
                            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
                        )
                    }
                    className="app-submit"
                >
                    Search
                </button>
            </form>
            {loading ? (
                <p className="app-loading">Loading...</p>
            ) : (
                <div className="app-meal-container">
                    {meals?.map((mealItem, index) => {
                        return (
                            <MealCard
                                key={index}
                                meal={mealItem}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default App;
