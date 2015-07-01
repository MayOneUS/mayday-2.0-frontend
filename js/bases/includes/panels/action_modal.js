function fetch_legislator_info() {
  var $nomineeSelect = $('#nominee')
  $.ajax({
    dataType: "json",
    // url: '{{site.services_url}}/legislators',
    url: '/data/legislators.json',
    success: function(legislators) {
      legislators.map(function(legislator){
        var field_value = ' value="' + legislator.id + '"';
        var disqualifier = '';
        if (legislator.with_us) {
          var disqualifier = ' (already with us!)'
        } else if (!legislator.eligible) {
          var disqualifier = ' (no 2016 election)'
        }
        var subtext = ' data-subtext="' + legislator.title + ' ' + legislator.state_name + disqualifier + '"';
        var disabled = (legislator.with_us || !legislator.eligible ? ' disabled="disabled"' : '');
        $nomineeSelect.append(
          '<option' + field_value + subtext + disabled + '>' + legislator.name + '</option>'
        );
      });
      $('.btn-group.bootstrap-select').remove()
      $nomineeSelect.removeClass('hidden').selectpicker();
    }
  });
}

$(document).ready(function(){
  fetch_legislator_info();

  $(".show-nomination-modal").on("click", function() {
    $("#additional-fields").show();
    $("#nomination-page-thanks").hide();
    $("#nomination-page-1").show();
    $("#submit-candidate-modal").modal("show");
    $(".bootstrap-select .filter-option").text("Search by name or state");
  });

  $("#submit-again").on("click", function() {
    $("textarea, select").val("");
    $("#nomination-page-thanks").hide();
    $("#nomination-page-1").show();
  });

  $("#js-nomination-form").submit(function (event) {
    event.preventDefault();
    var saveURI = '{{site.services_url}}/nominations';
    $.post(saveURI, $(this).serialize());
    $("#nomination-page-1").hide();
    $("#nomination-page-thanks").show();
    $("#additional-fields").hide();
    $(".bootstrap-select .filter-option").text("Select another legislator");
  });

  // $(".js-join-modal").on('click', function (event) {
  //   event.preventDefault();
  //   var baseURI = '//onboarding-staging.mayday.us';
  //   var iframeURI = baseURI;
  // });
});