import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import httpClient from '../httpClient';
import NavigationBar from './NavigationBar';

interface NewRecipeProps {}

interface RecipeData {
  directions: any;
  id: number;
  name: string;
  photo_url: string;
  ingredients: string;
  video_url: string | undefined;
  cooking_time: number;
  prep_time: number;
  calories: number;
  user_id: string;
  ratings: number;
  favourite: boolean;
  created_at: string;
}


const NewRecipe: React.FC<NewRecipeProps> = () => {
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState<RecipeData>({
  directions: "",
  id: 0,
  name: "",
  photo_url: "",
  ingredients: "",
  video_url: "",
  cooking_time: 0,
  prep_time: 0,
  calories: 0,
  user_id: "",
  ratings: 0,
  favourite: false,
  created_at: "",
});
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    /*setRecipeData({ ...recipeData, [name]: value });*/ 
    //setRecipeData("");
    
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create a new Recipe object using the form data
  axios.get('/@me')
  .then(response => {
    const user_id = response.data.id;
    const new_recipe= {
      name: recipeData.name,
      photo_url: recipeData.photo_url,
      ingredients: recipeData.ingredients,
      directions: recipeData.directions,
      video_url: recipeData.video_url,
      cooking_time: recipeData.cooking_time,
      prep_time: recipeData.prep_time,
      calories: recipeData.calories,
      user_id: user_id,
      ratings: recipeData.ratings,
      favourite: recipeData.favourite,
      created_at: recipeData.created_at,
    };
      httpClient.post(`//localhost:5000/user:${user_id}/recipes`, new_recipe)
      .then(response => {
        console.log(response.data);
        // Redirect to the recipe page
        navigate(`/recipe/${response.data.id}`);
      })
      .catch(error => {
        console.error(error);
      });
  });

// Clear the form on successful submission
setRecipeData({
  directions: "",
  id: 0,
  name: "",
  photo_url: "",
  ingredients: "",
  video_url: "",
  cooking_time: 0,
  prep_time: 0,
  calories: 0,
  user_id: "",
  ratings: 0,
  favourite: false,
  created_at: "",

  });
 
    // Redirect to the recipes page
    navigate("/recipes");
  };

  return (
    <div>
      <NavigationBar />
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipeData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="photo_url">Photo URL:</label>
        <input
          type="url"
          id="photo_url"
          name="photo_url"
          value={recipeData.photo_url}
          onChange={handleChange}
          required
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <input
        type="text"
        id="ingredients"
        name="ingredients"
        value={recipeData.ingredients}
        onChange={handleChange}
        required
        />


        <label htmlFor="directions">Directions:</label>
        <input
          type="text"
          id="directions"
          name="directions"
          value={recipeData.directions}
          onChange={handleChange}
          required
        />

        <label htmlFor="video_url">Video URL:</label>
        <input
          type="url"
          id="video_url"
          name="video_url"
          value={recipeData.video_url}
          onChange={handleChange}
        />

        <label htmlFor="cooking_time">Cooking Time:</label>
        <input
          type="number"
          id="cooking_time"
          name="cooking_time"
          value={recipeData.cooking_time}
          onChange={handleChange}
          required
        />

        <label htmlFor="prep_time">Prep Time:</label>
        <input
          type="number"
          id="prep_time"
          name="prep_time"
          value={recipeData.prep_time}
          onChange={handleChange}
          />
    <button type="submit">Submit</button>
    <button onClick={()=> navigate(-1)}>Cancel</button>
    </form>
    </div>
 )
};

export default NewRecipe;