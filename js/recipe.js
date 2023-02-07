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
//create drink card body this is where snippet descripton will go of the drink will go
var drinkCardBody = $('<div class= card-body>');
//append card body to main drink card
drinkCard.append(drinkCardBody);
var drinkTitle = $('<h5 class=card-title>');
drinkTitle.html(" ");
drinkCardBody.append(drinkTitle)

var drinkDescription = $('<p class=card-text>');
drinkDescription.html(" ");
drinkCardBody.append(drinkDescription);
var drinkGenBtn = $('<a class=btn>').addClass("btn-success");
drinkGenBtn.html("Generate Another Drink");
drinkGenBtn.attr("id","gen-drink");


drinkCardBody.append(drinkGenBtn)

function getDrink(){
    
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://drinks-digital1.p.rapidapi.com/v1/cocktails?limit=10",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "a3e58689c4msh05163be274f5a0fp1e482cjsn52c38c025a06",
            "X-RapidAPI-Host": "drinks-digital1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);


        for(let i=0; i < response.length;i++){
            console.log(response[i].cocktail_name)
        }
    });
}
  
//Function to push modal button and modal onto page - add onto the "on click" for recipe result click.
function modalButton (responseURL) {
//TODO need to change targeted id to match recipe page
    var footerDiv = $("#vid-modal-div");

    //adding modal launch button to page
        var videoModalButton = $("<button>");
            videoModalButton.attr("type", "button");
            videoModalButton.attr("class", "btn btn-primary modalBtn");
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
    //below append adds the modal to the page but it is invisble until activated by the button above
    footerDiv.append(modalDivOne);
        //div two
        var modalDivTwo = $("<div>").attr("class", "modal-dialog");
        modalDivOne.append(modalDivTwo);
        //div three
        var modalDivThree = $("<div>").attr("class", "modal-content");
        modalDivTwo.append(modalDivThree);
        //div four and header contents
        var modalDivFour = $("<div>").attr("class", "modal-header");
        modalDivThree.append(modalDivFour);
        var modalHeader = $("<h5>").attr("class", "modal-title");
        modalHeader.attr("id", "exampleModalLabel");
        modalHeader.text("Recipe video");
        modalDivFour.append(modalHeader);
        var modalClose = $("<button>").attr("type", "button");
        modalClose.attr("class", "close");
        modalClose.attr("data-dismiss", "modal");
        modalClose.attr("aria-label", "Close");
        modalDivFour.append(modalClose);
        var modalCloseSpan = $("<span>").attr("aria-hidden", "true");
        modalCloseSpan.text("x");
        modalClose.append(modalCloseSpan);
        //div five modal body
        var modalDivFive = $("<div>").attr("class", "modal-body");
        modalDivThree.append(modalDivFive);
            //TODO width/height subject to change
        var modalVideo = $("<video>").attr("width", "400px");
        modalVideo.attr("height", "auto");
        modalVideo.attr("controls", "");
        modalVideo.attr("autoplay", "");
        modalDivFive.append(modalVideo);
    //Line below contains Amazon Web Services URL from API queryURL (passed into function)
            var videoSource = $("<source>").attr("src", responseURL);
        videoSource.attr("type", "video/mp4");
        modalVideo.append(videoSource);
        //div six modal footer
        var modalDivSix = $("<div>").attr("class", "modal-footer");
        modalDivThree.append(modalDivSix);
        var modalFooterClose = $("<button>").attr("type", "button");
        modalFooterClose.attr("class", "btn btn-secondary");
        modalFooterClose.attr("data-dismiss", "modal");
        modalFooterClose.text("Close");
        modalDivSix.append(modalFooterClose);

} 










































































// .on("click") function associated with the drink button
$(".btn-success").on("click", function(event) {
   event.preventDefault();
   

   // Constructing an URL for the Cocktails API
   const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://drinks-digital1.p.rapidapi.com/v1/cocktails?limit=20",
      "method": "GET",
      "headers": {
         "X-RapidAPI-Key": "e340ac574emsh63e332762d5a073p1cd549jsnd394f6e76f3a",
         "X-RapidAPI-Host": "drinks-digital1.p.rapidapi.com"
      }
   };
   
   $.ajax(settings).done(function (response) {
      var results = response.data;

      console.log(response);

      var item = response[Math.floor(Math.random() * response.length)];
      console.log(item);
      var title = item.cocktail_name;
      var description = item.description;
   
      drinkTitle.html(" ");
      drinkDescription.html(" ");
      drinkTitle.append(title);
      drinkDescription.append(description);
   });
 })


