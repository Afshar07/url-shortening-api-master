function callAPI(userInput){
  url = 'https://api.shrtco.de/v2/shorten?url='+ userInput;
  $.get( url , function (data , result) {
    console.log(data);
    console.log(result);
  });
}



$('.btn').click(function(){
  var a = $("input[name='userInput']").val();
  console.log(a);
  callAPI(a);
});
