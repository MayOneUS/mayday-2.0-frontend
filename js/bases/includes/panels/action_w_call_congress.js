$(document).ready(function(){
  $('.js-form-call-congress').validate({
    submitHandler: function(form) {
      $form = $(form);
      $form.find('button.btn').html('<i class="fa fa-refresh fa-spin"></i> Calling');
      $.post('{{site.services_url}}/calls', $form.serialize() ).done(function(data){
        $parent = $form.parents('.incomplete');
        if(location.pathname == '/take-action/'){
          setAsComplete($parent);
        }else{
          $parent.removeClass('incomplete');
          $parent.addClass('complete').addClass('thanked');
        }
        $.each(data.targets.slice(0, 5), function(index, target_data){
          var rendered = ich.call_target_template(target_data);
          $('.js-targets').append(rendered);
        });
      }).fail(function(data){
        alert('There was an error. Please try again later.')
      })

    }
  });
});