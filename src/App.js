import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState, useEffect } from 'react';

//backup apiKey = 836b05dc277b4b069872ca76bb337dbc
//og apiKey = f10bc06bc4814ba7bde4690e75679ea1

const apiKey = '836b05dc277b4b069872ca76bb337dbc';
const randomURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;
const dessertURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=dessert`;

function App() {
  const [recipe, setRecipe] = useState(null);

  //Random Generated food
  async function getRandomRecipe() {
    try {
      const response = await axios.get(randomURL);
      console.log(response.data);
      setRecipe(response.data.recipes[0]);
    } catch (error) {
      console.error(error);
    }
  }
  //Dessert
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
    <div>
      {/* Navbar */}
      <nav class="navbar navbar-light" style={{ backgroundColor: '#f8f3f4' }}>
        <h1>Meal of the day</h1>    
          {/*Random buttons and Dessert recipe */}
        <div className='btn-container'>
          <button class="btn btn-secondary" onClick={getRandomRecipe}>Generate your random meal of the day!</button>
          <button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={getDessertRecipe}>
            Get a dessert recipe
          </button>
        </div>
      </nav>
      {/* Recipe here with bootstrap and incredients */}
      <div className='container'>
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
              {/* Instructions step by step numeric listing */}
              <h3>Instructions:</h3>
            </div>
            <ol>
              {recipe?.analyzedInstructions[0]?.steps?.map((step, index) => (
                <li key={index}>{step.step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;