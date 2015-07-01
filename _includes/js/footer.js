debugger

$(document).ready(function(){
  HeaderFooterSignupOptions = {
    submitHandler: function(form) {
      $form = $(form);
      var saveURI = '{{ site.services_url }}/people';
      $.post(saveURI, $form.serialize());
      $form.hide();
      $form.next().removeClass('hidden');
    }
  }

  $("header form.email-signup").validate(HeaderFooterSignupOptions);
  $("footer form.email-signup").validate(HeaderFooterSignupOptions);

  function manageSource(source_key, skipped_forms_selector){
    var url_param = getParameterByName(source_key);
    if (url_param.length > 2){
      Cookies.set(source_key, getParameterByName(source_key), { expires: 7 });
    }
    var current_cookie_value = Cookies.get(source_key);
    if(typeof current_cookie_value != "undefined"){
      current_cookie_value = current_cookie_value.replace(' ','+');
      var $form = $('form').not(skipped_forms_selector);
      var input_name = source_key.replace(/(email)/, 'person\\[$1\\]');
      var target_ref = 'input[name='+input_name+']';
      input_name = input_name.replace('\\[','[').replace('\\]',']')

      if($form.find(target_ref).length == 0){
        $form.append('<input type="hidden" name="'+input_name+'" value="'+current_cookie_value+'">');
      }else{
        $form.find(target_ref).val(current_cookie_value);
      }
    }
  }

  manageSource('utm_source');
  manageSource('utm_medium');
  manageSource('utm_campaign');
  manageSource('email', 'header form, footer form');

  var source_url = location.protocol + '//' + location.host + location.pathname;
  $('form').append('<input type="hidden" name="source_url" value="'+source_url+'">');
});

// Google analytics setup
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-50367295-1', 'auto');
ga('send', 'pageview');