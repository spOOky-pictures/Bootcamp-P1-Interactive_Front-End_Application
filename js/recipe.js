//target main div
var mainDiv = $('#main');
//make main div container  fluid so we can use bootstrap column system on it 
mainDiv.addClass("container-fluid");

//make an aside tag and append it to main div
var asideContent = $("<aside class=row>");
mainDiv.append(asideContent);

//makes drink card  gives it card class so bootstrap treats it as card component
var drinkCard = $("<div class=card>");
drinkCard.addClass("col-lg-2 col-sm-12");
//assign id of drink-card for css styling
drinkCard.attr("id","drink-card")
//append drink card to aside content
asideContent.append(drinkCard)
//make an image tag inside the card and giving bootstrap class of card-img-top
var drinkImg = $('<img class=card-img-top>');
//also added a class of show. on smaller screens(media query this should change to hide and set display to none)
drinkImg.addClass("show")
drinkImg.attr("src", "https://placehold.co/1000x400?text=Tasty+Drink+(+Coming+Soon+)&font=Raleway")
//append image to drink card
drinkCard.append(drinkImg);
//create drink card body this is where snippet descripton will go of the drink will go
var drinkCardBody = $('<div class= card-body>');
//append card body to main drink card
drinkCard.append(drinkCardBody);
var drinkTitle = $('<h5 class=card-title>');
drinkTitle.html("Placeholder Drink Name");
drinkCardBody.append(drinkTitle)

var drinkDescription = $('<p class=card-text>');
drinkDescription.html("palceholder description of drink");
drinkCardBody.append(drinkDescription);
var drinkGenBtn = $('<a class=btn>').addClass("btn-success");
drinkGenBtn.html("Generate Another Drink");
drinkGenBtn.attr("id","gen-drink");


drinkCardBody.append(drinkGenBtn)

//Function to push modal onto page - add to on click for recipe result click.
function modalButton (responseURL) {
//TODO need to change targeted id to match recipe page
    var footerDiv = $("#pageFooter");

    //adding modal launch button to page
        var videoModalButton = $("<button>");
            videoModalButton.attr("type", "button");
            videoModalButton.attr("class", "btn btn-primary");
            videoModalButton.attr("data-toggle", "modal");
            videoModalButton.attr("data-target", "#exampleModal");
            videoModalButton.text("Recipe video!")
        footerDiv.append(videoModalButton);

    //modal content
        //div one
        var modalDivOne = $("<div>").attr("class", "modal fade");
        modalDivOne.attr("id", "exampleModal");
        modalDivOne.attr("tabindex", "-1");
        modalDivOne.attr("aria-labelledby", "exampleModalLabel");
        modalDivOne.attr("aria-hidden", "true");
        //div two
        var modalDivTwo = 

} 

