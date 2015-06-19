if( window.location.pathname == '/' ){

  $('.full-bg-image').on('click', function(){
    window.location = '/june23/';
  })

  $('.js-sign-letter-form').validate({
    submitHandler: function(form) {
      $form = $(form);
      $form.find('button.btn').html('<i class="fa fa-refresh fa-spin"></i> Loading...');
      $.post('{{site.services_url}}/actions', $form.serialize(), function(data){
      }).done(function(){
        window.location = '/sign-the-letter/?already_signed=true';
      });
    }
  });

}