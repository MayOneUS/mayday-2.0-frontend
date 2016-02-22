
// For PAYPAL, look at this link.
//https://developer.paypal.com/docs/classic/express-checkout/in-context/integration/

md.donateForm = {};
(function(donateForm) {
  var donationCompleteCallback;

  var tokenReceivedCallback = function(token){
    var employmentInfo = employmentBasedOnRetirement();
    $.extend(donateForm.formData.person, {
      address: token.card.address_line1,
      city: token.card.address_city,
      state_abbrev: token.card.address_state,
      zip: token.card.address_zip
    }, employmentInfo);
    $.extend(donateForm.formData, {
      stripe_token: token.id,
      amount_in_cents: donateForm.formData.donation_amount*100
    }, employmentInfo); // employmentInfo here should deprecate in backend.
    console.log('calling back with', token, donateForm.formData);
    $.post(services_url+'/donations', donateForm.formData, donationCompleteCallback);
  };

  var employmentBasedOnRetirement = function(){
    if($('#person\\[is_retired\\]').is(':checked')){
      var employmentInfo = {employer: 'retired', occupation: 'retired'};
    }else{
      var employmentInfo = {
        employer: donateForm.formData.person.remote_fields.employer,
        occupation: donateForm.formData.person.remote_fields.occupation
      };
    }
    return employmentInfo;
  };

  var stripeConfigurationOptions = {
    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    image: '/images/2016_mayday-logo-sheild.svg',
    name: 'MAYDAY.US',
    locale: 'auto',
    panelLabel: 'Donate',
    billingAddress: true,
    token: tokenReceivedCallback,
    bitcoin: true,
  };

  var stripePaymentProcess = function(){
    donateForm.stripeHandler = StripeCheckout.configure(stripeConfigurationOptions);
    donateForm.stripeHandler.open({
      name: 'MAYDAY.US',
      // description: '2 widgets',
      amount: donateForm.donation_amount,
      email: donateForm.formData.person.email
    });
  };

  var revealNextStep = function() {
    $('.progress-meter .active').removeClass('active').addClass('complete')
        .next().next().addClass('active');
    var $activeFieldset = donateForm.$form.find('fieldset.active'),
      $nextFieldset = $activeFieldset.next();
    $activeFieldset.addClass('hidden').removeClass('active');
    $nextFieldset.addClass('active').removeClass('hidden');
    donateForm.formData = donateForm.$form.serializeObject();
    $('html, body').animate({
      scrollTop: $nextFieldset.offset().top-200
    }, 200);
    if($nextFieldset.is('fieldset:last')){
      console.log($nextFieldset, 'call payment method with object:', donateForm.formData);
      stripePaymentProcess();
    }
  };

  var initializeOtherAmountInput = function(){
    donateForm.$form.find('#donate-other').on('change', function(){
     var  $self = $(this)
      if($self.prop('checked') == true){
        $self.siblings().prop('disabled', false).focus();
      }
    });
  };

  var intializeRetiredCheckbox = function () {
    donateForm.$form.find('#person\\[is_retired\\]').on('change', function(){
      $('#person\\[remote_fields\\]\\[employer\\], #person\\[remote_fields\\]\\[occupation\\]').prop('disabled', function(i, v) { return !v; });
    })
  }

  var initializeNextSteps = function() {
    donateForm.$form.find('.btn-mayday-blue-medium').on('click', function(e){
      e.preventDefault();
      if(donateForm.$form.valid()){
        revealNextStep();
      }
    })
  }

  donateForm.initialize = function(form_selector, completionCallback){
    donationCompleteCallback = completionCallback;
    donateForm.$form = $(form_selector);
    donateForm.$form.validate();
    initializeOtherAmountInput();
    intializeRetiredCheckbox();
    initializeNextSteps();
  }


})(md.donateForm);