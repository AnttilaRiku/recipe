import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState, useEffect } from 'react';

const randomURL = 'https://api.spoonacular.com/recipes/random?apiKey=f10bc06bc4814ba7bde4690e75679ea1';
const dessertURL = 'https://api.spoonacular.com/recipes/random?apiKey=f10bc06bc4814ba7bde4690e75679ea1&tags=dessert'


function App() {
  const [recipe, setRecipe] = useState(null);

  async function getRandomRecipe() {
    try {
      const response = await axios.get(randomURL);
      console.log(response.data);
      setRecipe(response.data.recipes[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function getDessertRecipe() {
    try {
      const response = await axios.get(dessertURL);
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
      <h1>Meal of the day</h1>
      <div className='btn-container'>
        <br></br>
        <button class="btn btn-secondary" onClick={getRandomRecipe}>Generate your random meal of the day!</button>
        <button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={getDessertRecipe}>
          Get a dessert recipe
        </button>
      </div>
      {recipe && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', marginBottom: '20px' }} />
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
