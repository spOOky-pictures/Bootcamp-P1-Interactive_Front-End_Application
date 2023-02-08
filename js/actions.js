// -dropdown uses a predefined list of recipe categories
// -clicking on search button takes search field value and recipe category to query API
// -cards display last 3 recipes from an array stored in local storage
// -searched ingredient gets stored in separate array and displayed in recently searched section
// -clicking any of these buttons adds it's value to the search field with a space

// assign variable to "main" div
let mainDiv = $("resultsPage");
// a variable that holds recipe IDs
const recipeIds = [];

$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("#loading").addClass("loadOn");
    }).ajaxComplete(function () {
        $("#loading").removeClass("loadOn");
    });
});

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
            "X-RapidAPI-Key": "8be18867b6msh6fc8d6aad5acc56p1976f9jsnf9fe02c89bd2",
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
        // a variable that holds recipe IDs
        const recipeIds = [];
        // for loop that runs through each element of response array
        for (let i = 0; i < Response.length; i++) {
            // check if returned element's "canonical_id" key contains a word "recipe"
            // (making sure we only ever get returned recipes)
            // and also checks whether "count" variable has reached length of variable "recipes"
            if (String(Response[i].canonical_id).includes("recipe") && count < recipes) {
                // defines all elements of the card with their attributes using jQuery
                let recipeCardLink = $("<a>").attr({class: "card-link", href: "#recipePage"});
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
                let ingredientArray = []
                Response[i].sections[0].components.forEach(ingredient => {
                    ingredientArray.push(ingredient.raw_text);
                })
                let instructionArray = []
                Response[i].instructions.forEach(instruction => {
                    instructionArray.push(instruction.display_text);
                })
                // recipe sections pulls recipe Name, Image, Ingredients and Instructions from API
                let recipePage = $("#recipePage");
                let recipeImage = $("#recipe-image");
                let recipeName = $("#recipe-name");
                let recipeIngredients = $("#recipe-ingredients");
                let recipeText = $("#recipe-info");
                recipeCardLink.click(function() {
                    recipePage.show();
                    recipeImage.attr("src", Response[i].thumbnail_url);
                    recipeName.text(Response[i].name);
                    Response[i].sections[0].components.forEach(ingredient => {
                        let ingredientLi = $("<li>").attr("class", "recipe-li");
                        ingredientLi.html(ingredient.raw_text);
                        recipeIngredients.append(ingredientLi);
                    })
                    Response[i].instructions.forEach(instruction => {
                        let instructionP = $("<p>").attr("class", "recipe-p");
                        instructionP.html(instruction.display_text);
                        recipeText.append(instructionP);
                    })
                })
                // pushed each found recipe to the "recipeIds" array 
                recipeIds.push({id: Response[i].id, image: Response[i].thumbnail_url, name: Response[i].name, ingredients: ingredientArray, instructions: instructionArray});
                // increases "count" variable by 1 number
                count++;
            }    
        }
    })
};

// -drink card pulls drink Name, Image and URL for randomly selected drink
// -right-side section pulls recipe Image and Nutrition from API

// -clicking on video button opens a modal that displays a recipe Video from API and auto-plays it

// Selectors for search button
var searchButton = $(".searchButton");
var searchInput = $("#homeScreen .searchInput");

//Empty array for ingredients in local storage
var previousSearches = [];

//Document ready function
$(document).ready(function () {

//On load, local storage is pushed to screen
loadPreviousItems();

//On click function for search button
searchButton.on("click", function(event){
    event.preventDefault();
    var resultsContainer = $("#resultsPage");
    resultsContainer.empty();
    var userInput = searchInput.val().trim();
//validation for empty user input
    if(userInput === ""){
        return;
    } 
    else {
        $("#headerSearchBar").removeClass("d-none");
    //     $("#homeScreen").addClass("d-none");
        $("#resultsSection").removeClass("d-none");
//Push user input into local storage
previousSearches.push(userInput);
localStorage.setItem("Previous Ingredients", previousSearches);
// $('#homeScreen').css("display","none");
// resultsDiv.css("display","flex");
// triggers getRecipeIds function
getRecipeIds(userInput);
    }
})

//function to load historical searches to the screen as buttons
function loadPreviousItems(){
    var historyString = localStorage.getItem("Previous Ingredients");
    // validation for if the local storage is empty
    if(!historyString){
        return;
    } else {
        //for loop for the localStorage array that pushes them as buttons to the screen.
        var historyArray = historyString.split(',');
        //Slice ensures only the three most recent searches are pushed to screen.
        var historyArraySlice = historyArray.slice(-3);
        for(i = 0; i < historyArraySlice.length; i++){
            //TODO need to replace id/class to actual HTML id/class for what is being appended 
            var newItemBtn = $("<button>").text(historyArraySlice[i]);
            newItemBtn.attr("class", "prevSearch");
            $("#recentResults").append(newItemBtn);
        }
    }
}

//Previous search buttons on click to push input to search bar
$(".prevSearch").on("click", function(event){
    event.preventDefault();
        var prevInput = this.innerHTML;
        searchInput.val(prevInput);
    });
})

// function for home button to refresh page and go back to original state
$("#homeButton").on("click", function(){
    document.location.reload()
})