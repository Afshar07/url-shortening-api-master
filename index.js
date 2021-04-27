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

    let jsonData = JSON.stringify(historyAndDetails);
    sessionStorage.setItem("data" , jsonData);


    for ( let i = historyAndDetails.length-1; i >= historyAndDetails.length-3 ; i--) {

      if( i == historyAndDetails.length-1){

        $("#middle-section .container")
          .append("<div class='contain-short-link latest-link'> <div class='userUrlEntered'>"+ // this append works on ShortLinks Details
                   historyAndDetails[i].urlUserEntered+
                  "</div> <div class='linkAndCopy'><input id='link-"+i+"' value='"+historyAndDetails[i].urlShorted+"' readonly>"+
                  "<button class='btn btn-"+i+"'>Copy</button>"+
                  "</div> </div> <script>" +
                  "$('.contain-short-link .btn-"+i+
                  "').click(function(){navigator.clipboard.writeText(document.getElementById('link-"+i+
                  "').value);$('#link-"+i+"').fadeOut(1000).fadeIn(1000);$('.contain-short-link .btn-"+i+
                  "').html('Copied!').css({'background-color':'hsl(257, 27%, 26%)'});})"+
                  "</script>"
                ).fadeIn(900);
      }else{

              $("#middle-section .container")
                .append("<div class='contain-short-link'> <div class='userUrlEntered'>"+ // this append works on ShortLinks Details
                         historyAndDetails[i].urlUserEntered+
                        "</div><div class='linkAndCopy'> <input id='link-"+i+"' value='"+historyAndDetails[i].urlShorted+"' readonly>"+
                        "<button class='btn btn-"+i+"'>Copy</button>"+
                        "</div> </div> <script>" +
                        "$('.contain-short-link .btn-"+i+
                        "').click(function(){navigator.clipboard.writeText(document.getElementById('link-"+i+
                        "').value);$('#link-"+i+"').fadeOut(1000).fadeIn(1000);$('.contain-short-link .btn-"+i+
                        "').html('Copied!').css({'background-color':'hsl(257, 27%, 26%)'});})"+
                        "</script>"
                      ).fadeIn(900);
                   }
            }
      });
}

$('.btn').click(function(){
  console.log("clicked");
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


if (sessionStorage.getItem("data")){
  let newData = sessionStorage.getItem("data");
  let jsonParse = JSON.parse(newData);
    if(jsonParse.length === 1 ){
      historyAndDetails.push(jsonParse[0]);
    }else if (jsonParse.length <= 2){
      historyAndDetails.push(jsonParse[0]);
      historyAndDetails.push(jsonParse[1]);
    } else if (jsonParse.length == 3){
      historyAndDetails.push(jsonParse[1]);
      historyAndDetails.push(jsonParse[2]);
    }

  for (var i = jsonParse.length-1 ; i >=jsonParse.length - 4 ; i-- ) {
  $("#middle-section .container")
    .append("<div class='contain-short-link'> <div class='userUrlEntered'>"+ // this append works on ShortLinks Details
             jsonParse[i].urlUserEntered+
            "</div> <div class='linkAndCopy'><input id='link-"+i+"' value='"+jsonParse[i].urlShorted+"' readonly>"+
            "<button class='btn btn-"+i+"'>Copy</button>"+
            "</div> </div> <script>" +
            "$('.contain-short-link .btn-"+i+
            "').click(function(){navigator.clipboard.writeText(document.getElementById('link-"+i+
            "').value);$('#link-"+i+"').fadeOut(1000).fadeIn(1000);$('.contain-short-link .btn-"+i+
            "').html('Copied!').css({'background-color':'hsl(257, 27%, 26%)'});})"+
            "</script>"
            ).fadeIn(900);
          }
        }

//  function copy (a) {
//   let copyText = $(a);
//   copyText.select();
//   document.execCommand("copy");
// }

// below code is good for copy item to clipboard but

//navigator.clipboard.writeText(a);
// is a MAGIC for real
// a must be a DOM string
