// Selectors for search button
//TODO - change id names HTML dependant
var searchButton = $("#searchBtn");
var searchInput = $("#searchValue");

//On click function for search button
searchButton.on("click", function(event){
    event.preventDefault();
    var userInput = searchInput.val().trim();
//Tasty API Query one - list of meals
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tasty.p.rapidapi.com/recipes/list?from=0&size=8&q=Chicken",
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
    });
})