function panelCounter($targetHolder, count) {
  count = count.toString()
  var count = "0000" + count;
  counts = count.substr(count.length-4).split('');
  $.each(counts, function(i, count){
    $targetHolder.append('<div class="tile">'+count+'<span class="hr"></span></div>');
  })
}

$(document).ready(function(){
  $.get('{{site.services_url}}/stats', function(data){
    $('#js-lobbyists-counters').html('')
    $('#js-calls-counters').html('')
    panelCounter($('#js-lobbyists-counters'), data.volunteer_count);
    panelCounter($('#js-calls-counters'), data.letter_signers);
  });
});