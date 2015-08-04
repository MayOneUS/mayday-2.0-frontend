function store_form_data ($form,keys) {
  $.each(keys, function(key),{
    $.jStorage.set(key, $form.find(key).val() )
  }
}