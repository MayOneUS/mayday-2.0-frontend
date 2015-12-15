if( window.location.pathname == '/legislators/' ){

(function ( data ){

  function loadTargetedAction(){
    if(location.hash.length > 1){
      hash_location = location.hash.replace(/^#/,'');
      setListFilter(hash_location);
    }
  }

  function setListFilter(filterValue){
    $('.legislators-listing').parent().prop('class', 'container legislators-'+filterValue)
    var $target = $('input[name="filter-value"][value="' + filterValue + '"]')
    $target.prop('checked', true);
    $('.filter-title').text($target.prop('title'));
    // will scroll page if using jquery here
    var el = document.getElementById(filterValue);
    var id = el.id;
    el.removeAttribute('id');
    location.hash = filterValue;
    el.setAttribute('id',id);
  }

  function renderAllies(legislator_data, index) {
    var rendered = [],
        unknowable_reps = ['DC', 'AS', 'GU', 'VI', 'PR', 'MP'];

    legislator_data.short_title = legislator_data.title === 'Senator' ? 'Sen.' : 'Rep.';
    legislator_data.lower_abbrev = legislator_data.state_abbrev.toLowerCase();
    legislator_data.leg_thumbnail = 'url(' + legislator_data.image_url + ')';
    if($.inArray(legislator_data.state_abbrev, unknowable_reps) > -1){
      legislator_data.with_us = 'unknowable';
    }

    rendered_html = HandlebarsTemplates['cards/legislators-listing'](legislator_data);
    $('#js-legislators').append(rendered_html);
  }

  function callDataAndTemplate(legislators) {
    var allyObject = [],
      potentialCount;


    legislators.forEach( function ( data, index ){
      allyObject.push( data );
    });

    $('#js-legislators').removeClass('text-center').empty();
    allyObject.map(renderAllies);

    potentialCount = $('.legislators-listing .potential-true').length;
    $('label[for=leaders]').append(' ('+ $('.legislators-listing .with-us-true').length+')');
    $('label[for=all]').append(' ('+ $('.legislators-listing>div>div').not('.with-us-unknowable').length+')');
    $('label[for=potential]').append(' ('+potentialCount+')');
    $('#js-potential-count').text(potentialCount);

    $('#search').hideseek({'nodata': "No legislator matched your search."});
  }

  $(document).ready(function(){
    "use strict";

    loadTargetedAction();

    $('form.legislators-filter .radio-inline input').on('change', function(e){
      e.preventDefault();
      var filterValue = $('form.legislators-filter .radio-inline input:checked').val();
      setListFilter(filterValue);
    });

    var newAllyDataUrl = data;
    var outSide = {};

    $.getJSON(newAllyDataUrl, callDataAndTemplate);

  });

})( services_url+'/legislators.json' );



}