// Selectors for search button
//TODO - change id names HTML dependant
var searchButton = $("#searchBtn");
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
        if(historyString === ""){
            return;
        } else {
    //for loop for the localStorage array that pushes them as buttons to the screen.
            var historyArray = historyString.split(',');
                for(i = 0; i < historyArray.length; i++){
    //TODO need to replace id/class to actual HTML id/class for what is being appended 
                var newItemBtn = $("<button>").text(historyArray[i]);
                $("#testButtons").append(newItemBtn);
                }
        }
}
})