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

  //checking to see if it has double slashing in the URL
  var count = 0;

  for(var i = 0; i < str.length; i++){

    if(str.charAt(i) == '/' && str.charAt(i+1) == '/' && str.charAt(i+2) != '/'){
      count++;
    }
  }

  // assigning the value if the URL contains "@" symbol
  var slashing_result;
  if (count > 1){
    slashing_result = 1;
  } else {
    slashing_result = -1;
  }
  alert(count);
  document.getElementById("slashing").innerHTML = slashing_result;

  //filterting out the url to contain only an IP address
  var ip_add;
  ip = str.replace(/[^\d.-]/g, '');
  ip2 = ip.replace(/[-]/g, "");
  // alert(ip2);

  //checking to see whether the number and characters left in the url are in the format of a IP address
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.\.$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.\.\.$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.\.\.\.$/.test(ip2)) {
    ip_add = 1;
    // alert("you have an ip address" + ip_add);
    document.getElementById("ip_address").innerHTML = ip2;
    return (true);
  }
  ip_add = -1;
  // alert("You have entered an invalid IP address!" + ip_add)
  document.getElementById("ip_address").innerHTML = "no ip address "  + ip2;
  return (false);

  //assigning the value of 1 if the Length is greater than 54
  var url_length;
  if (length >= 54){
    url_length = 1;
  } else {
    url_length = -1;
  }
  // alert(url_length);

  //assigning the value if the URL contains "@" symbol
  var at;
  if (str.includes("@")){
    at = 1;
  } else {
    at = -1;
  }
  // alert(at);

  //assigning the value if the URL contains "@" symbol
  var prefix_result;
  if (str.includes("-")){
    prefix_result = 1;
  } else {
    prefix_result = -1;
  }
  // alert(prefix_result);

}
