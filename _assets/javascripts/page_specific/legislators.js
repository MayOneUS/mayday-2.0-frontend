md.leaders = {};
(function(leaders) {
  leaders.leader_data = services_url+'/legislators.json' ;

  leaders.loadTargetedAction = function (){
    if(location.hash.length > 1){
      fragment = getUrlFragment();
      setListFilter(fragment);
    }
  }

  leaders.setListFilter = function (filterValue){
    $('.legislators-listing').parent().prop('class', 'container legislators-'+filterValue);
    var $target = $('input[name="filter-value"][value="' + filterValue + '"]');
    $target.prop('checked', true);
    $('.filter-title').text($target.prop('title'));
    // will scroll page if using jquery here
    var el = document.getElementById(filterValue);
    var id = el.id;
    el.removeAttribute('id');
    location.hash = filterValue;
    el.setAttribute('id',id);
  }

  leaders.renderAllies = function (legislator_data, index) {
    var rendered = [],
        unknowable_reps = ['DC', 'AS', 'GU', 'VI', 'PR', 'MP'];

    legislator_data.short_title = legislator_data.title === 'Senator' ? 'Sen.' : 'Rep.';
    legislator_data.lower_abbrev = legislator_data.state_abbrev.toLowerCase();
    legislator_data.leg_thumbnail = 'url(' + legislator_data.image_url + ')';
    if(legislator_data.with_us == true){
      legislator_data.link_text = 'Supporter';
    }else if(legislator_data.with_us == false){
      legislator_data.link_text = 'Non-Supporter';
    }else{
      legislator_data.link_text = 'Read More';
    }
    if($.inArray(legislator_data.state_abbrev, unknowable_reps) > -1){
      legislator_data.with_us = 'unknowable';
    }

    rendered_html = HandlebarsTemplates['cards/legislators-listing'](legislator_data);
    $('#js-legislators').append(rendered_html);
  }

  leaders.callDataAndTemplate = function (legislators) {
    var allyObject = [],
      potentialCount;


    legislators.forEach( function ( data, index ){
      allyObject.push( data );
    });

    $('#js-legislators').removeClass('text-center').empty();
    allyObject.map(leaders.renderAllies);

    potentialCount = $('.legislators-listing .potential-true').length;
    $('label[for=leaders]').append(' ('+ $('.legislators-listing .with-us-true').length+')');
    $('label[for=all]').append(' ('+ $('.legislators-listing>div>div').not('.with-us-unknowable').length+')');
    $('label[for=potential]').append(' ('+potentialCount+')');
    $('#js-potential-count').text(potentialCount);

    $('#search').hideseek({'nodata': "No legislator matched your search."});
  }

  leaders.initialize = function () {
    leaders.loadTargetedAction();

    $('form.legislators-filter .radio-inline input').on('change', function(e){
      e.preventDefault();
      var filterValue = $('form.legislators-filter .radio-inline input:checked').val();
      leaders.setListFilter(filterValue);
    });

    $.getJSON(leaders.leader_data, leaders.callDataAndTemplate);
  }

})(md.leaders);
