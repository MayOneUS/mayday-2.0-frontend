md.signUps = {};
(function(signUps) {
  signUps.inititalizeBasic = function (formSelector, completedCallback) {
    $(formSelector).validate({
      submitHandler: function(form) {
        $form = $(form);
        $form.find('button.btn').html('<i class="fa fa-refresh fa-spin"></i> Loading...');
        $.post(services_url+'/actions', $form.serialize(), function(data){
        }).done(function(){
          completedCallback();
        }).fail(function(){
          alert('There was an error. Please try again later.');
          $form.find('button.btn').html('Try Again');
        });
      }
    });
  }
  signUps.inititalizeDonateStart = function(formSelector){
    $(formSelector).on('submit', function(e){
      e.preventDefault();
      formData = $(formSelector).serializeObject();
      window.location = '/donate/?donation_amount='+formData.donation_amount;
    })
  }
})(md.signUps);

// TODO: would be good to attempt to standardize other submission forms types.
// Google forms submission are probably the most general, then all the JS code
// on the take action page could be better.