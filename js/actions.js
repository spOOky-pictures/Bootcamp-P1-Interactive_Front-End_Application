// -dropdown uses a predefined list of recipe categories
// -clicking on search button takes search field value and recipe category to query API
// -cards display last 3 recipes from an array stored in local storage
// -searched ingredient gets stored in separate array and displayed in recently searched section
// -clicking any of these buttons adds it's value to the search field with a space

// assign variable to "main" div
let mainDiv = $("main");
// a variable that holds recipe IDs
const recipeIds = [];

// function that pulls 8 recipes from API with Image and Name that displays them in separate cards, each linking to "recipes.html" page
// the function takes one parameter that is a string of one or multiple (coma-separated) values
function getRecipeIds(searchQuery){ //<-- TODO: make "searchQuery" automate from Search input field
    const settings = {
        "async": true,
        "crossDomain": true,
        // here we setup Tasty API recipes/list endpoint with two parameters: from=0 and size=15 (increase size if not getting enough recepies returned)
        "url": `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${searchQuery}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "e8943b6d91msh6efd506b4fc5910p102802jsn9031badcaece",
            "X-RapidAPI-Host": "tasty.p.rapidapi.com"
        }
    };
    
    // here we make a call to the Tasty API using ajax
    $.ajax(settings).done(function (response) {
        // assign results to Response variable
        let Response = response.results;
        // defines and sets "count" variable for counting number of recipes 
        let count = 0;
        // defines number of recipes we want returned
        let recipes = 8;
        // for loop that runs through each element of response array
        for (let i = 0; i < Response.length; i++) {
            // check if returned element's "canonical_id" key contains a word "recipe"
            // (making sure we only ever get returned recipes)
            // and also checks weather "count" variable has reached length of variable "recipes"
            if (String(Response[i].canonical_id).includes("recipe") && count < recipes) {
                // defines all elements of the card with their attributes using jQuery
                let recipeCardLink = $("<a>").attr({class: "card-link", href: "recipes.html"});
                let recipeCard = $("<div>").attr("class", "card").css("width", "18rem");
                let recipeCardImage = $("<img>").attr("class", "card-img-top");
                let recipeCardBody = $("<div>").attr("class", "card-body");
                let recipeCardTitle = $("<h5>").attr("class", "card-title");
                // attaches all elements to their respective parents to display a card in DOM
                mainDiv.append(recipeCardLink);
                recipeCardLink.append(recipeCard);
                recipeCardImage.attr("src", Response[i].thumbnail_url);
                recipeCard.append(recipeCardImage);
                recipeCard.append(recipeCardBody);
                recipeCardTitle.text(Response[i].name);
                recipeCardBody.append(recipeCardTitle);
                
                // pushed each found recipe to the "recipeIds" array 
                recipeIds.push(Response[i].id);
                // increases "count" variable by 1 number
                count++;
            }
        }       
    })
};
// triggers getRecipeIds function
getRecipeIds("potato,mushroom");

// -drink card pulls drink Name, Image and URL for randomly selected drink
// -recipe sections pulls recipe Name, Ingredients and Instructions from API
// -right-side section pulls recipe Image and Nutrition from API
// -clicking on video button opens a modal that displays a recipe Video from API and auto-plays it