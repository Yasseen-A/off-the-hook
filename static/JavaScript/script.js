function url_info() {
  //variable that will take in the URL to be checked
  var str = document.getElementById("url_input").value;
  var test = document.getElementsByName("test")[0];

  test = str;

  //checking how long the URL length is
  var length = str.length;

  //assigning the value for the SSL
  if (str.includes("https")){
    document.getElementById("SSL").value = "1";
  } else {
    document.getElementById("SSL").value = "-1";
  }

  //checking to see if https is part of the domain name
  var count2 = 0;

  for(var i = 0; i < str.length; i++){

    if(str.charAt(i) == 'h' && str.charAt(i+1) == 't' && str.charAt(i+2) == 't' && str.charAt(i+3) == 'p' && str.charAt(i+4) == 's')
    count2++;
  }

  var count3 = 0;

  for(var i = 0; i < str.length; i++){

    if(str.charAt(i) == 'h' && str.charAt(i+1) == 't' && str.charAt(i+2) == 't' && str.charAt(i+3) == 'p' && str.charAt(i+4) != 's')
    count3++;
  }


  if (count3 >= 1 && count2 >= 1 || count2 > 1){
    document.getElementById("token").value = "1";
  } else {
    document.getElementById("token").value = "-1";
  }

  //checking to see if it has double slashing in the URL
  var count = 0;

  for(var i = 0; i < str.length; i++){

    if(str.charAt(i) == '/' && str.charAt(i+1) == '/' && str.charAt(i+2) != '/'){
      count++;
    }
  }

  // assigning the value if the URL contains "@" symbol
  if (count > 1){
    document.getElementById("slash").value = "1";
  } else {
    document.getElementById("slash").value = "-1";
  }


  if (str.includes("about:blank") || str.includes(" ")){
    document.getElementById("SFH").value = "1";
  } else {
    document.getElementById("SFH").value = "-1";
  }

  //assigning the value of 1 if the Length is greater than 54
  var url_length;
  if (length >= 54){
    document.getElementById("url").value = "1";
  } else {
    document.getElementById("url").value = "-1";
  }


  //assigning the value if the URL contains "@" symbol
  var at;
  if (str.includes("@")){
    document.getElementById("at").value = "1";
  } else {
    document.getElementById("at").value = "-1";
  }


  //assigning the value if the URL contains "@" symbol
  var prefix_result;
  if (str.includes("-")){
    document.getElementById("prefixes").value = "1";
  } else {
    document.getElementById("prefixes").value = "-1";
  }


  //filterting out the url to contain only an IP address
  var ip_add;
  ip = str.replace(/[^\d.-]/g, '');
  ip2 = ip.replace(/[-]/g, "");


  //checking to see whether the number and characters left in the url are in the format of a IP address
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.\.$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.\.\.$/.test(ip2)
  || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.\.\.\.$/.test(ip2)) {
    document.getElementById("IP").value = "1";
    return (true);
  }
  document.getElementById("IP").value = "-1";
  return (false);



}
