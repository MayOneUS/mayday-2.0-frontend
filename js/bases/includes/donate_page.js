---
---
{% include js/footer.js %}
debugger
// if(window.location.pathname.split('/')[1] == '/donate/' || window.location == '/bitcoin/'){ 
// TODO: figure this syntax out

/*

Copyright 2015 Mayday PAC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

PLEDGE_URL = "{{ pledge_url }}";

function step2(amount){
  $(".step-1-container").hide("slow");
  $("#step-1").removeClass("active");
  $("#step-2").addClass("active");
  //$("#pledgeBox").animate({height: "auto"}, 500);
  if( amount > 0 ) {
    $("#amount_input").val(amount);
    $("#amount_input").parent().hide();
  }
  $(".step-2-container").show("slow");
}

function step3(){
  $("#step-2").removeClass("active");
  $("#step-3").addClass("active");
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
var ALREADY_BANKED = 1000000;
var GOAL_DOLLARS = 5000000;
$(function() {
  var date = new Date();
  date.setTime(date.getTime()+(24*60*60*1000));
  document.cookie = ("last_team_key={{team.key()}};" +
                     "expires=" + date.toGMTString() +
                     ";domain=.mayday.us;path=/");

  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    var verStr = $.browser.version;
    var ffVersion = verStr.split('.')[0];
    console.log("detected version: " + ffVersion);
    if (ffVersion < 17) {
      $('#pledgeBox .info').after('<div class="alert-danger row">Sorry, we are not supporting older Firefox versions at the moment. Please try another browser for now.</div>');
    } else {
      console.log('Firefox version was OK: ' + ffVersion);
    }
  }
});