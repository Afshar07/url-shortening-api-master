//jshint esversion:6

const historyAndDetails= [];

function callAPI(userInput){
  url = 'https://api.shrtco.de/v2/shorten?url='+ userInput;
  fetch(url)
  .then( function (response) {

    if ( response.status >= 400 && response.status<=499){
      alert ("ERROR! BAD INPUT ENTER A VALID URL");
      return null;

    } else if (response.status >= 500 && response.status<=599){
      alert ("ERROR! ON SERVER PLEASE TRY AGIN LATER");

    }else {
      return response.json();

    }
  })
  .then(function (res){
    let shortLink = res.result.full_short_link2;

    let linkDetails = {
      urlUserEntered: userInput,
      urlShorted: shortLink
    };
    historyAndDetails.push(linkDetails);
    if (historyAndDetails.length > 3) {
      historyAndDetails.shift();
    }
    for ( let i = historyAndDetails.length-1; i > historyAndDetails.length - 4 ; i--){
      $("#middle-section .container")
        .append("<div class='contain-short-link'>"+
                 historyAndDetails[i].urlUserEntered+
                "<input id='link-"+i+"' value='"+historyAndDetails[i].urlShorted+"' readonly>"+
                "<button class='btn btn-"+i+"'>Copy</button>"+
                "</div> <script>" +
                "$('.contain-short-link .btn-"+i+
                "').click(function(){navigator.clipboard.writeText(document.getElementById('link-"+i+"').value);$('#link-"+i+"').fadeOut(1000).fadeIn(1000);$('.contain-short-link .btn-"+i+"').html('Copied!').css({'background-color':'hsl(257, 27%, 26%)'});})"+
                "</script>"
                ).fadeIn(900);
    }
});
}

$('.btn').click(function(){
  $("#middle-section .container")
  .fadeOut(600 , function(){
    $("#middle-section .container").html("");
  });
  let a = $("#input").val();
  if (a.length === 0 ) { // if the Input Were Empty
    $(".label")
    .html("Please Add a link");
    $("#input")
      .attr("value","Shorten a link here...")
      .addClass('red')
      .css({"border": "1px solid red"})

      .click(function(){ // reseting the Empty Notification by clicking on input box
        $('.label')
          .html("");
        $("#input")
          .attr("value","")
          .removeClass('red')
          .css({'border': 'none'});
    });
    //changing PlaceHolder color on Error is going to FUCKED ME UP 01:15 AM
    //Solution : there were no solution so i decide to do this with
    //input value attribute 02:07 AM
  }else{
    navigator.clipboard.writeText(a);
    callAPI(a);
  }
});




//  function copy (a) {
//   let copyText = $(a);
//   copyText.select();
//   document.execCommand("copy");
// }

// below code is good for copy item to clipboard but

//navigator.clipboard.writeText(a);
// is a MAGIC for real
// a must be a DOM string
