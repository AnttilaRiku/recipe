import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState, useEffect } from 'react';

//const URL = 'https://api.spoonacular.com/recipes/random?apiKey=f10bc06bc4814ba7bde4690e75679ea1';

function App() {
  const [recipe, setRecipe] = useState(null);

  async function getRandomRecipe() {
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      setRecipe(response.data.recipes[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <div className='container'>
      <div className='btn-container'>
        <h1>Meal of the day</h1>
        <button  class="btn btn-secondary"  onClick={getRandomRecipe}>Generate your food of the day!</button>
      </div>
      {recipe && (
        <div>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <div className="ingredients">
            <div>
              <h3>Ingredients needed:</h3>
            </div>
            <ul>
              {recipe.extendedIngredients?.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Instrunctions:</h3>
          </div>
          <ol>
            {recipe?.analyzedInstructions[0]?.steps?.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
