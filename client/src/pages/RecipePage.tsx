import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../httpClient';
import NavigationBar from './NavigationBar';

interface Recipe {
  _id: string;
  recipe: string;
  photo_URL: string;
  ingredients: string;
  directions: string;
  video_URL: string;
  description: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  calories: string;
  user_id: string;
}

const RecipePage: React.FC<{ navigationBar: React.ReactNode }> = ({
  navigationBar,
}) => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const resp = await httpClient.get(`/recipes/${id}`);
        setRecipe(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const {
    recipe: recipeName,
    photo_URL,
    ingredients,
    directions,
    video_URL,
    description,
    prep_time,
    cook_time,
    total_time,
    calories,
    user_id,
  } = recipe;

  return (
    <>
      <NavigationBar />
      <div>
        <img src={photo_URL} alt={recipeName} />
        <div>{recipeName}</div>
        <div>User ID: {user_id}</div>
        <div>Preparation Time: {prep_time} min</div>
        <div>Cooking Time: {cook_time} min</div>
        <div>Total Time: {total_time} min</div>
        <div>Description: {description}</div>
        <div>Calories: {calories} kcal</div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1 1 50%', paddingRight: '10px' }}>
            <h3>Ingredients:</h3>
            <ul>
              {ingredients.split('\n').map((ingredient, i) => (
                <li key={i}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 50%', paddingLeft: '10px' }}>
            <h3>Directions:</h3>
            <div dangerouslySetInnerHTML={{ __html: directions }} />
            {video_URL && (
              <div>
                <h3>Video:</h3>
                <iframe
                  title="video"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video_URL}`}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipePage;
