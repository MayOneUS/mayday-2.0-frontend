function manageDataFromParams(source_key, skipped_forms_selector){
  var url_param = getParameterByName(source_key);
  if (url_param.length > 2){
    Cookies.set(source_key, getParameterByName(source_key), { expires: 7 });
  }
  var current_cookie_value = Cookies.get(source_key);
  setFormsValues(source_key, current_cookie_value, skipped_forms_selector)
}

function wrapParamForRails(param_key) {
  return param_key.replace(/(email|first_name|last_name|phone|zip)/, 'person\\[$1\\]');
}

function setFormsValues(source_key, current_cookie_value, skipped_forms_selector){
  if(typeof current_cookie_value != "undefined"){
    current_cookie_value = current_cookie_value.replace(' ','+');
    var $form = $('form').not(skipped_forms_selector);
    var input_name = wrapParamForRails(source_key);
    var target_ref = 'input[name='+input_name+'], input[name='+input_name+']';
    input_name = input_name.replace('\\[','[').replace('\\]',']')

    if($form.find(target_ref).length == 0){
      $form.append('<input type="hidden" name="'+input_name+'" value="'+current_cookie_value+'">');
    }else{
      $form.find(target_ref).val(current_cookie_value);
    }
  }
}

function setAllStandardFormsValues($form){
  $(['email', 'first_name', 'last_name', 'phone', 'zip']).each(function(index, attribute_key){
    var input_name = wrapParamForRails(attribute_key);
    var target_ref = 'input[name='+input_name+']';
    var current_cookie_value = $form.find(target_ref).val();
    setFormsValues(attribute_key, current_cookie_value);
  })
}

$(document).ready(function(){
  HeaderFooterSignupOptions = {
    submitHandler: function(form) {
      ga('send', 'event', 'form', 'submit', 'email_signup');
      $form = $(form);
      var saveURI = '{{ site.services_url }}/people';
      $.post(saveURI, $form.serialize());
      $form.hide();
      $form.next().removeClass('hidden');
    }
  }

  $("header form.email-signup").validate(HeaderFooterSignupOptions);
  $("footer form.email-signup").validate(HeaderFooterSignupOptions);


  manageDataFromParams('utm_source');
  manageDataFromParams('utm_medium');
  manageDataFromParams('utm_campaign');
  manageDataFromParams('email', 'header form, footer form');

  var source_url = location.protocol + '//' + location.host + location.pathname;
  $('form').append('<input type="hidden" name="source_url" value="'+source_url+'">');
});