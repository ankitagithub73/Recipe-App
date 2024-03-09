const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContenet = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// function to get recipe---------
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p><span>Belongs to ${meal.strCategory}</span> Category</p>
       `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //    adding eventlistener to recipe button

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    });
}
catch(error){
    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
}

}


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
         recipeContainer.innerHTML=`<h2>Type the meal in the search box...</h2>`;
         return;
    }
    fetchRecipes(searchInput);
});


const openRecipePopup = (meal) => {
    recipeDetailsContenet.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="ingredient">Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        
        <div>
            <h3>Instructions :</h3>
            <p class="recipeInstruction">${meal.strInstructions}</p>
        </div>
        
    `

    recipeDetailsContenet.parentElement.style.display = "block";
}

// functionto to fetch ingredents and measurement---------
const fetchIngredients = (meal) => {
   
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `
            <li>${measure} ${ingredient}</li>
            `
        }
        else {
            break;
        }
    }
    return ingredientsList;
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContenet.parentElement.style.display="none";
})