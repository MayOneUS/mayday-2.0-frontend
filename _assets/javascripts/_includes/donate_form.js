example_token = {
  "id": "tok_17fiSI2eZvKYlo2Ctrswi7Ye",
  "object": "token",
  "card": {
    "id": "card_17fiSI2eZvKYlo2CiqNoPJrA",
    "object": "card",
    "address_city": null,
    "address_country": null,
    "address_line1": null,
    "address_line1_check": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null,
    "address_zip_check": null,
    "brand": "Visa",
    "country": "US",
    "cvc_check": null,
    "dynamic_last4": null,
    "exp_month": 8,
    "exp_year": 2017,
    "funding": "credit",
    "last4": "4242",
    "metadata": {
    },
    "name": null,
    "tokenization_method": null
  },
  "client_ip": null,
  "created": 1455766070,
  "livemode": false,
  "type": "card",
  "used": false
}
// For PAYPAL, look at this link.
//https://developer.paypal.com/docs/classic/express-checkout/in-context/integration/

md.donateForm = {};
(function(donateForm) {
  var stripeConfiguration = {
    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    image: '/images/2016_mayday-logo-sheild.svg',
    name: 'MAYDAY.US',
    locale: 'auto',
    panelLabel: 'Donate',
    billingAddress: true,
    token: donateForm.tokenReceivedCallback,
    bitcoin: true,
  };

  // donateForm.stripeHandler = StripeCheckout.configure(stripeConfiguration);

  var tokenReceivedCallback = function(token){
    console.log(token)
    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
  };

  var validSubmitHandler = function(form){
    // var $form = $(form);
    stripeHandler.open({
      name: 'Stripe.com',
      description: '2 widgets',
      amount: 2000,
      email: 'emailAddress@gmail.com'
    });
  };

  var revealNextStep = function() {
    $('.progress-meter .active').removeClass('active').addClass('complete')
        .next().next().addClass('active');
    var $activeFieldset = $form.find('fieldset.active'),
      $nextFieldset = $activeFieldset.next();
    $activeFieldset.addClass('hidden').removeClass('active');
    $nextFieldset.addClass('active').removeClass('hidden');
    $('html, body').animate({
        scrollTop: $nextFieldset.offset().top-200
    }, 200);
    if($nextFieldset.is('fieldset:last')){
      console.log($nextFieldset, 'call payment method with object:', $form.serializeObject());
    }else{
      console.log($nextFieldset, 'is not last', $form.serializeObject());
    }
  };

  var initializeOtherAmountInput = function(){
    $form.find('#donate-other').on('change', function(){
      $self = $(this)
      console.log($self);
      if($self.prop('checked') == true){
        console.log($self.siblings());
        $self.siblings().prop('disabled', false).focus();
      }
    });
  };

  var intializeRetiredCheckbox = function () {
    $form.find('#person\\[is_retired\\]').on('change', function(){
      console.log('retire trigger');
      $('#person\\[employer\\], #person\\[occupation\\]').prop('disabled', function(i, v) { return !v; });
    })
  }

  var initializeNextSteps = function() {
    $form.find('.btn-mayday-blue-medium').on('click', function(e){
      e.preventDefault();
      if($form.valid()){
        console.log('form indicates valid')
        revealNextStep();
      }
    })
  }

  donateForm.initialize = function(form_selector){
    stripeHandler = StripeCheckout.configure(stripeConfiguration);
    $form = $(form_selector);
    $form.validate({
      submitHandler: validSubmitHandler
    });
    initializeOtherAmountInput();
    intializeRetiredCheckbox();
    initializeNextSteps();
  }


})(md.donateForm);