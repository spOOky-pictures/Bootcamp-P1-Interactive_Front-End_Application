// -dropdown uses a predefined list of recipe categories
// -clicking on search button takes search field value and recipe category to query API
// -cards display last 3 recipes from an array stored in local storage
// -searched ingredient gets stored in separate array and displayed in recently searched section
// -clicking any of these buttons adds it's value to the search field with a space

// assign variable to "main" div
let mainDiv = $("main");
// a variable that holds recipe IDs
const recipeIds = [];
//make a containter fluid to store search results in and append to main div
let resultsDiv = $('<section class=container-fluid>');
mainDiv.append(resultsDiv);
let resultsRow = $('<div class=row>').addClass("container-fluid").attr("id","results-row");
resultsDiv.append(resultsRow);

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
                // let recipeCardLink = $("<a>").attr({class: "card-link", href: "recipes.html"}).addClass("col-lg-6").addClass("col-sm-12");;
                // let recipeCard = $("<div>").attr("class", "card").css("width", "18rem").addClass("row");
                // let recipeCardImage = $("<img>").attr("class", "card-img-top");
                // let recipeCardBody = $("<div>").attr("class", "card-body");
                // let recipeCardTitle = $("<h5>").attr("class", "card-title");
                // attaches all elements to their respective parents to display a card in DOM
                
                let recipeCard = $("<div class=card>").addClass("mb3").addClass("col-lg-6").addClass("col-sm-12").attr("id","result-card");
                let recipeCardLink= $('<a>').attr({class: "card-link", href: "recipes.html"}).addClass("row").addClass("g-0");
                
                let recipeCardImage = $('<img class=img-fluid>').attr({src:Response[i].thumbnail_url,alt:"recipe-image"}).addClass("rounded-start").addClass("col-2");
                let recipeCardBody = $('<div class=card-body>').addClass("col-10");
                let recipeCardTitle = $("<h5>").attr({class: "card-title"}).text(Response[i].name);




                resultsRow.append(recipeCard);
                recipeCard.append(recipeCardLink);
                // recipeCardImage.attr("src", Response[i].thumbnail_url);
                recipeCardLink.append(recipeCardImage);
                recipeCardLink.append(recipeCardBody);
                // recipeCardTitle.text(Response[i].name);
                recipeCardBody.append(recipeCardTitle);
                
                // pushed each found recipe to the "recipeIds" array 
                recipeIds.push(Response[i].id);
                // increases "count" variable by 1 number
                count++;
            }
        }       
    })
};

// -drink card pulls drink Name, Image and URL for randomly selected drink
// -recipe sections pulls recipe Name, Ingredients and Instructions from API
// -right-side section pulls recipe Image and Nutrition from API

// -clicking on video button opens a modal that displays a recipe Video from API and auto-plays it

// Selectors for search button
//TODO - change id names HTML dependant
var searchButton = $(".searchButton");
var searchInput = $("#searchValue");

//Empty array for ingredients in local storage
var previousSearches = [];


//Document ready function
$(document).ready(function () {


//On load, local storage is pushed to screen
loadPreviousItems();

//On click function for search button
searchButton.on("click", function(event){
    event.preventDefault();
    var userInput = searchInput.val().trim();
//validation for empty user input
    if(userInput === ""){
        return;
    } else {
//Push user input into local storage
previousSearches.push(userInput);
localStorage.setItem("Previous Ingredients", previousSearches);
$('#homeScreen').css("display","none");
// triggers getRecipeIds function
getRecipeIds(userInput);

//Tasty API Query one - list of meals
    
//Getting response from API for list of recipes that include ingredient
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

