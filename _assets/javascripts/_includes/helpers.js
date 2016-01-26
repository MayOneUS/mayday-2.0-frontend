function getParameterByName( name ) {
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);

  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function americanDateFormat(date_string){
  date = new Date(date_string);
  return(date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear());
}
