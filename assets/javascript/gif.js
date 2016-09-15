 //Variables for buttons Loaded with HTML

 var yankees = ['Derek Jeter', 'Joe Girardi', 'Lou Gehrig', 'Mariano Rivera', 'Gary Sanchez', 'Babe Ruth', 'Joe Torre', 'Masahiro Tanaka'];
  console.log(yankees);
  renderButtons();

  $('#addPlayer').on('click', function(){
    console.log('button is clicked')

    
    var playerNew = $('#player-input').val().trim();

     yankees.push(playerNew);
     console.log(yankees);
     renderButtons();

    $('#player-input').val("");

    return false;
   
  })

//Player Button On-Click Functionality
$('#div01').on('click', '.playerButton', function() {
        
  $('#gifs').empty();


        var playerGif = $(this).data('playernames');
        console.log(playerGif);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + playerGif + "&api_key=dc6zaTOxFJmzC&limit=10";
// Ajax Call
       $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
              
                console.log(response)

                var results = response.data;

// For Loop to display 10 Images per Response
                for (var i = 0; i < 10; i++) {
                    console.log(results[i]);

                    var playerDiv = $('<div>');

                    
                    var p = $('<p>')
                    p.text('rating: ' + results[i].rating);
                    
                    
                    console.log(results[i].rating);
                    var playerImage = $('<img>');
                    
                    playerImage.attr('src', results[i].images.fixed_height_still.url);
                    playerImage.attr('data-still', results[i].images.fixed_height_still.url);
                    playerImage.attr('data-animate', results[i].images.fixed_height.url);
                    playerImage.attr('data-state', 'still')
                    playerImage.addClass('playerImage');
                    playerDiv.append(p);
                    playerDiv.append(playerImage);
                    $('#gifs').prepend(playerDiv);
                }
           })





});
// Render Buttons to be added when new player is submitted
function renderButtons(){ 

      $('#div01').empty(); 
      for (var i=0; i<yankees.length; i++){
          var a = $('<button>');
          a.attr('data-playernames', yankees[i]);
          a.text(yankees[i]);
          a.addClass('playerButton');
          $('#div01').append(a);
          console.log(a);
          console.log(i);
      }


};

// Gif On-click state for 'Still' and 'Animate'
 $('#gifs').on('click', '.playerImage', function(){
     console.log("image is clicked")

     var state = $(this).attr('data-state'); 
      if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

 });




