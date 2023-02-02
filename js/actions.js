
// -dropdown uses a predefined list of recipe categories
// -clicking on search button takes search field value and recipe category to query API
// -cards display last 3 recipes from an array stored in local storage
// -searched ingredient gets stored in separate array and displayed in recently searched section
// -clicking any of these buttons adds it's value to the search field with a space
// -recipe card pulls recipe Name, Image and URL from API and displays them in a card
// -drink card pulls drink Name, Image and URL for randomly selected drink
// -recipe sections pulls recipe Name, Ingredients and Instructions from API
// -right-side section pulls recipe Image and Nutrition from API
// -clicking on video button opens a modal that displays a recipe Video from API and auto-plays it

// Selectors for search button
//TODO - change id names HTML dependant
var searchButton = $(".search");
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
//Tasty API Query one - list of meals
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tasty.p.rapidapi.com/recipes/list?from=0&size=8&q=" + userInput,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "78e5609727msh1ba34c0ebc625dcp184ea7jsn9d56a3cb8dc5",
            "X-RapidAPI-Host": "tasty.p.rapidapi.com"
        }
    };
//Getting response from API for list of recipes that include ingredient
    $.ajax(settings).done(function (response) {
    //for loop to loop through responses and pull ID numbers
        //TODO recipie more info API query will need to go in this loop.
        for ( var i = 0; i < response.results.length; i++){
            console.log(response.results[i].id);
        }

    });}
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
                $("#testButtons").append(newItemBtn);
                }
        }
    }

//Previous search buttons on click to push input to search bar
$(".prevSearch").on("click", function(){
        var prevInput = this.innerHTML;
        searchInput.val(prevInput);
    });

})


