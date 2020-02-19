function myFunction() {
  var str = document.getElementById("url_input").value;
  var n = str.length;
  document.getElementById("demo").innerHTML = n;

  var url_length;

  if (n >= 54){
    url_length = 1;
  } else {
    url_length = -1;
  }

  alert (url_length);
}
