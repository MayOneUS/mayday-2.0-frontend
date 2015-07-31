"use strict";

(function ( data ){
  $(document).ready(function(){
    var newAllieData = data;
    var outSide = {};

    function renderAllies(legislator_data, index) {
      var rendered = [];
      legislator_data.short_title = legislator_data.title === 'Senator' ? 'Sen.' : 'Rep.';
      rendered = ich.legislator_template(legislator_data);
      $('#js-legislators').append(rendered);
    }

    function callDataAndTemplate(legislators) {
      var allyObject = [];

      legislators.forEach( function ( data, index ){ //gets three reps
        if (index < 3 ){
          allyObject.push( data );
        }
      });
      allyObject.map(renderAllies);
    }
    $.getJSON(newAllieData, callDataAndTemplate);
  });
})( '{{site.services_url}}/legislators/newest_supporters.json' );