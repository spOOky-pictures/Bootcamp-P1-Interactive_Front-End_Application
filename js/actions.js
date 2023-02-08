// assign variable to "main" div
let mainDiv = $("main");
// a variable that holds recipe IDs
const recipeIds = [];
//make a containter fluid to store search results in and append to main div
let resultsWrapper = $("<div>").attr("class", "row");
let resultsDiv = $('<section class=container-fluid>').css("display","none").attr("class", "col-lg-12");
resultsDiv.attr("id", "resultsDiv");
var searchHeader = $("#headerSearchBar");
resultsWrapper.append(searchHeader);
resultsWrapper.append(resultsDiv)
mainDiv.append(resultsWrapper);
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
            "X-RapidAPI-Key": "78e5609727msh1ba34c0ebc625dcp184ea7jsn9d56a3cb8dc5",
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
                let recipeCard = $("<div class=card>").addClass("mb3").addClass("col-lg-5").addClass("col-sm-12").attr("id","result-card");
                let recipeImgDiv = $('<div class="col-4">').attr("id","img-div");
                let recipeCardLink= $('<a>').attr({class: "card-link", href: "recipes.html"}).addClass("row g-0"); 
                let recipeCardImage = $('<img class=img-fluid>').addClass("rounded-start").attr("id","recipe-img");
                let recipeBodyDiv = $('<div class="col-8">').attr("id","body-div");
                let recipeCardBody = $('<div class=card-body>');
                let recipeCardTitle = $("<h5>").attr({class: "card-title"});
                let recipeID = Response[i].id;
                recipeCard.attr("data-index",recipeID);
                // attaches all elements to their respective parents to display a card in DOM
                resultsRow.append(recipeCard);
                recipeCard.append(recipeCardLink);
                recipeCardLink.append(recipeImgDiv);
                recipeCardLink.append(recipeBodyDiv);
                recipeBodyDiv.append(recipeCardBody)
                recipeImgDiv.append(recipeCardImage);
                recipeCard.append(recipeCardLink);
                recipeCardImage.attr("src", Response[i].thumbnail_url);
                // recipeCardLink.append(recipeCardImage);
                // recipeCardLink.append(recipeCardBody);
                recipeCardTitle.text(Response[i].name);
                recipeCardBody.append(recipeCardTitle);
                
                // pushed each found recipe to the "recipeIds" array 
                recipeIds.push(recipeID);

                //put an on click event listener on the children of the anchor tag and call getvideo function
                recipeCardTitle.click(function(event){
                    // event.preventDefault()
                    getVideo(recipeCard);

                });
                // increases "count" variable by 1 number
                count++;
            }
        }       
    })
};

// triggers getRecipeIds function
// getRecipeIds("potato,mushroom");

// -drink card pulls drink Name, Image and URL for randomly selected drink
// -recipe sections pulls recipe Name, Ingredients and Instructions from API
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
    var resultsContainer = $("#results-row");
    resultsContainer.empty();
    var userInput = searchInput.val().trim();
//validation for empty user input
    if(userInput === ""){
        return;
    } else {
        $("#headerSearchBar").removeClass("d-none");
        $("#homeScreen").addClass("d-none");
        $("#resultsSection").removeClass("d-none");
//Push user input into local storage
previousSearches.push(userInput);
localStorage.setItem("Previous Ingredients", previousSearches);
$('#homeScreen').css("display","none");
resultsDiv.css("display","flex");
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

function getVideo(targetEl){
    let id = targetEl.attr("data-index");
    console.log(id)
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "a3e58689c4msh05163be274f5a0fp1e482cjsn52c38c025a06",
            "X-RapidAPI-Host": "tasty.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response)
        $("#vid-modal").css({background:response.thumbnail_url})
        if (response.original_video_url){
            // alert("YES")
           
            $("video").children("source").attr("src",response.original_video_url)
        }else{
            $("video").children("source").attr("src",response.thumbnail_url)
        }
       
    });
 
 
 }
