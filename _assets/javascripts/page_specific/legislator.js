if( window.location.pathname == '/legislator/' || window.location.pathname == '/legislator-landing/' ){

$( document ).ready( function(){
  "use strict";
  var bioguide_id = getParameterByName('bioguide_id'),
      tallies ='';

  function scorecard( legislator_data ){
    $('#js-legislator').empty();

    var l_d = legislator_data,
      supported_bill_names = [],
      unknowable_reps = ['DC', 'AS', 'GU', 'VI', 'PR', 'MP'];

    l_d.short_title = l_d.title === 'Senator' ? 'Sen.' : 'Rep.';
    l_d.title_name = [l_d.title,l_d.name].join(' ');
    l_d.bioguide_id = bioguide_id;
    if(!l_d.phone) l_d.show_phone = 'none';

    if ( l_d.with_us === true && l_d.eligible == true){
      l_d.tallies_rendered = ''

      $.each(l_d.current_sponsorships, function(index, data){
        data.centered = l_d.current_sponsorships.length == 1 ? 'center-block' : '';
        data.name = data.name.replace(/ of 201\d/,'')
        supported_bill_names.push(data.name)
        l_d.tallies_rendered += HandlebarsTemplates['legislator-page-talley'](data);
      });
      l_d.supported_bills_message = supported_bill_names.join(' and ');
      l_d.background_img = '/images/star_blue.svg';
      l_d.page_title = [l_d.title_name,'is a leader supporting fundamental reform of the way campaigns are funded.'].join(' ');
      l_d.tail_message = ['Thank',l_d.short_title,l_d.name, 'for being a leader'].join(' ') + '!';
      if(l_d.twitter_id){
        l_d.tweet_url = 'https://twitter.com/intent/tweet?text=Way to #Lead4Reform, @'+l_d.twitter_id+escape('! Thanks for cosponsoring the ')+escape(supported_bill_names[0])+escape(' to change how campaigns are funded.');
      }else{
        l_d.show_twitter = 'none';
      }
    } else {
      if(legislator_data.eligible == false || $.inArray(legislator_data.state_abbrev, unknowable_reps) > -1){
        legislator_data.with_us = 'unknowable';
        if(legislator_data.title == 'Senator'){
          l_d.page_title = [l_d.title_name,'is not up for re-election in 2016.'].join(' ');
        }else{
          l_d.page_title = [l_d.title_name, 'is a non-voting member.'].join(' ')
        }
        l_d.tail_message = '';
        l_d.show_phone = 'none';
        l_d.show_social = 'none';
      }else{
        l_d.background_img = '/images/call-page/money_sign.svg';
        l_d.page_title = [l_d.title_name,'is not yet a supporter of reforming the way elections are funded.'].join(' ');
        l_d.tail_message = ['Ask',l_d.short_title,l_d.name, 'to step up and lead!'].join(' ');
        if(l_d.twitter_id){
          l_d.tweet_url = 'https://twitter.com/intent/tweet?text=.@'+l_d.twitter_id+escape(' help lead the fight for fundamental reform of the way campaigns are funded. #Lead4Reform.')+'&url=http://repswith.us/reforms';
        }else{
          l_d.show_twitter = 'none';
        }
      }
    }
    if(l_d.bioguide_id == 'D000613'){
      $('#panel-body-p').text('MAYDAY activists are meeting with Congressman Dold’s District Director Philippe Melin on Wednesday, Sept. 9 at 10am in Lincolnshire. To receive updates or participate in this important initiative, sign up below.')
    }
    $('#panel-title').text(l_d.tail_message);
    var rendered_html = HandlebarsTemplates['legislator-page-legislator'](l_d);
    document.title = l_d.page_title

    $('#js-legislator').append(rendered_html);
    // $('#js-tallies').append(tallies);
  }

  $.getJSON(services_url+'/legislators/'+bioguide_id, scorecard);
});

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

}