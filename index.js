//jshint esversion:6

const historyAndDetails= [];

function callAPI(userInput){
  url = 'https://api.shrtco.de/v2/shorten?url='+ userInput;
  $.get( url , function (data , result) {
    let shortLink = data.result.full_short_link;
    console.log(shortLink);
    let detail = {
      urlUserSend: url ,
      urlShortened: shortLink
    };
    historyAndDetails.push(detail);
    console.log(historyAndDetails);
  });
}

$('.btn').click(function(){
  var a = $("input[name='userInput']").val();
  if (a.length === 0 ) {
    $(".label")
    .html("Please Add a link");
    $("#input")
      .attr("value","Shorten a link here...")
      .addClass('red')
      .css({"border": "1px solid red"})
      .click(function(){
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
  }

});
