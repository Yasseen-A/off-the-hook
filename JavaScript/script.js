function myFunction() {
  //variable that will take in the URL to be checked
  var str = document.getElementById("url_input").value;

  //checking how long the URL length is
  var length = str.length;
  document.getElementById("url_length").innerHTML = length;

  //checking to see if the "@" symbol is in the URL
  var at_symbol = str.includes("@");
  document.getElementById("at_symbol").innerHTML = at_symbol;

  //checking to see if the "-" symbol is in the URL
  var prefix = str.includes("-");
  document.getElementById("prefix").innerHTML = prefix;

  //assigning the value of 1 if the Length is greater than 54
  var url_length;
  if (length >= 54){
    url_length = 1;
  } else {
    url_length = -1;
  }
  alert(url_length);

  //assigning the value if the URL contains "@" symbol
  var at;
  if (str.includes("@")){
    at = 1;
  } else {
    at = -1;
  }
  alert(at);

  //assigning the value if the URL contains "@" symbol
  var prefix_result;
  if (str.includes("-")){
    prefix_result = 1;
  } else {
    prefix_result = -1;
  }
  alert(prefix_result);
}
