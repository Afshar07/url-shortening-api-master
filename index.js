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
      console.log(historyAndDetails);
      $("#middle-section .container")
        .append("<div class='contain-short-link'>"+
         historyAndDetails[i].urlUserEntered+
        //"<div class='link-and-copy'>"+
        "<a id='link' href='"+historyAndDetails[i].urlShorted+"'>"+historyAndDetails[i].urlShorted+"</a>"+
        "<button class='btn'>Copy</button>"+//"</div>"+
        "</div>"
      ).fadeIn(900);
    }

    $(".contain-short-link .btn").click(function(){
      (".contain-short-link .btn").fadeOut(400);
      copy("#link");
    });

  });
}

function copy (a) {
    let copyText = $(a);
    copyText.select();
    document.execCommand("copy");
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
    callAPI(a);
    $(".contain-short-link .btn").click(function(){
      copy("#link");
    });
  }

});
