

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



