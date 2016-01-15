 md.p2p = {};
(function(p2p) {
  p2p.edit = {};
  p2p.show = {};

  p2p.cloudinary_base_url = 'http://res.cloudinary.com/mayday/'

  p2p.edit.cloudinary_options = {
    cloud_name: 'mayday',
    upload_preset: 'gxmwkd7p',
    cropping: 'server',
    folder: 'p2p-donate-pages',
    button_caption: 'Upload a profile photo',
    button_class: 'btn btn-md-md btn-md-lightblue',
    // theme: 'mininal',
    cropping_aspect_ratio: 1,
    field_name: 'donation_page[photo_url]',
    multiple: false,
    max_file_size: 1024000,
    max_files: 1,
    thumbnail_transformation: {width: 200, height: 200, crop: 'fill' },
    thumbnails: '.js-cloudinary-thumbnails'
  }

  p2p.parseTransformedThumbnailUrl = function(cloundiary_string){
    if(cloundiary_string != 'undefined' && cloundiary_string){
      var transformed_image_path = cloundiary_string
        .replace(/#.+/,'')
        .replace('image/upload','image/upload/h_200,w_200,c_fill');
      return (p2p.cloudinary_base_url + transformed_image_path);
    }
  }

  p2p.edit.initializeDomObjects = function(){
    p2p.$renderElement      = $('.js-rendered-p2p-placeholder');
    p2p.$parentElement      = $('.js-rendered-p2p-placeholder').parents('.container');
    p2p.$previewElement     = $('.js-preview');
    p2p.$actionBarElement   = $('.js-preview-action-panel');
    p2p.$editingElement     = $('.js-p2p-form-container');
    p2p.$editingFormElement = p2p.$editingElement.find('form');
    p2p.$body               = $('body');
  }

  p2p.edit.initializeImageUploader = function(){
    $('#upload_widget_opener').cloudinary_upload_widget(
      p2p.edit.cloudinary_options,
      function(error, result) { console.log(error, result) }
    );
  }

  p2p.edit.generatePreviewPageData = function(){
    p2p.formObject = p2p.$editingFormElement.serializeObject();
    var donation_page = p2p.formObject.donation_page;
    donation_page.slug = slugify(donation_page.slug);
    donation_page.intro_text_markdown = marked(donation_page.intro_text);
    donation_page.thumbnail = p2p.parseTransformedThumbnailUrl(donation_page.photo_url)
    return donation_page;
  }

  p2p.edit.renderPreview = function(){
    var donation_page_data = p2p.edit.generatePreviewPageData(),
      renderedHtml = HandlebarsTemplates['p2p-donate-content'](donation_page_data);
    $('.js-sample-url').val('https://mayday.us/mydonate/#'+donation_page_data.slug);
    p2p.$renderElement.empty().append(renderedHtml);
    p2p.$parentElement.removeClass('hidden');
    p2p.$actionBarElement.removeClass('hidden');
    p2p.$previewElement.removeClass('hidden');
    p2p.$editingElement.addClass('hidden');
    p2p.$body.addClass('activeActionPanel');
  }

  p2p.edit.renderEdit = function(){
    p2p.$body.removeClass('activeActionPanel');
    p2p.$actionBarElement.addClass('hidden');
    p2p.$previewElement.addClass('hidden');
    p2p.$editingElement.removeClass('hidden');
  }

  p2p.edit.initializeFormValidator = function(){
    p2p.$editingFormElement.validate({
      submitHandler: function(form) {
        p2p.edit.storeDonationPage();
      },
    });
  }

  p2p.edit.storeDonationPage = function(){
    $.post(services_url + '/donation_pages', p2p.formObject, function(data){
      Cookies.set('personal_donation_page_uuid', data.slug)
      // window.location = 'https://mayday.us/mydonate/#' + data;
    })
  }

  p2p.edit.initializeEventBindings = function(){
    $('.js-slug').on('blur', function(e){
      e.currentTarget.value = slugify(e.currentTarget.value);
    });
    $('.js-preview-button').on('click', function(e){
      e.preventDefault();
      if(p2p.$editingFormElement.valid()){
        p2p.edit.renderPreview();
      }
    });
    $('.js-edit').on('click', function(){
      p2p.edit.renderEdit();
    });
    $('.js-save').on('click', function(){
      p2p.$editingFormElement.submit();
      // alert('not implemented, but goal to save and redirect to target page');
    });
    $('.js-preview-action-panel form').on('submit', function(e){
      e.preventDefault();
    })
  }

  p2p.edit.initialize = function(){
    p2p.edit.initializeEventBindings();
    p2p.edit.initializeDomObjects();
    p2p.edit.initializeImageUploader();
    p2p.edit.initializeFormValidator();
  }

  p2p.show.renderExistingDonatePage = function(slug){
    // p2p.existingPageUuid = Cookies.get('personal_donation_page_uuid');
    $.get(services_url + '/donation_pages/' + slug, function(data){
      p2p.showDonationPageData = data;
      p2p.showDonationPageData.intro_text_markdown = marked(p2p.showDonationPageData.intro_text);
      console.log(p2p.showDonationPageData.photo_url);
      p2p.showDonationPageData.thumbnail = p2p.parseTransformedThumbnailUrl(p2p.showDonationPageData.photo_url);
      renderedHtml = HandlebarsTemplates['p2p-donate-content'](p2p.showDonationPageData);
      p2p.$renderElement.append(renderedHtml);
    });
  }

  p2p.show.initialize = function(){
    p2p.$renderElement = $('.js-rendered-p2p-placeholder');
    var slug = getUrlFragment();
    p2p.show.renderExistingDonatePage(slug);
  }

})(md.p2p);