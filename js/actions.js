// Selectors for search button
var searchButton = $("#searchBtn");
var searchInput = $("searchValue");
var searchInputValue = searchInput.val();

//On click function for search button
searchButton.on("click", function(){
    console.log(searchInput);
})