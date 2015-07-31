$('.js-sign-up-form').validate({
  submitHandler: function(form) {
    $form = $(form);
    $form.find('button.btn').html('<i class="fa fa-refresh fa-spin"></i> Loading...');
    $.post('{{site.services_url}}/actions', $form.serialize(), function(data){
    }).done(function(){
      if(location.pathname == '/take-action/'){
        $next = $form.parents('li').next();
        $parent = $form.parents('li');
        setAsComplete($parent);
        makeActive($next);
      }else{
        location = '/take-action/#get-educated'
      }
    });
  }
});