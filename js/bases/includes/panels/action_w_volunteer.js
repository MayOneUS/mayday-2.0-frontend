$('.js-volunteer-form').validate({
  submitHandler: function(form) {
    $form = $(form);
    $form.find('button.btn').html('<i class="fa fa-refresh fa-spin"></i> Loading...');
    $.post('{{site.services_url}}/people', $(e.target).serialize(), function(data){
    }).done(function(){
      if(location.pathname == '/take-action/'){
        $parent = $form.parents('li');
        setAsComplete($parent);
      }else{
        //shouldn't really be on another page.
      }
    });
  }
});