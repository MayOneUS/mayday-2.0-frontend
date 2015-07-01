$("form.join").submit(function (event) {
  event.preventDefault();
  var userZip = $(this).find('input[name="person[zip]"]').val();
  var userEmail = $(this).find('input[name="person[email]"]').val();
  var queryString = 'zip=' + encodeURIComponent(userZip) + '&email=' + encodeURIComponent(userEmail);
  var baseURI = 'http://onboarding-staging.mayday.us';
  var iframeURI = baseURI + '?' + queryString;

  var saveURI = '{{site.services_url}}/people.json';
  $.post(saveURI, $(this).serialize())
    .always(function() {
      $("#onboarding-overlay").attr("src", iframeURI);
    })
    .done(function (data, textStatus, jqXHR) {
      console.log(data, textStatus);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    });
});