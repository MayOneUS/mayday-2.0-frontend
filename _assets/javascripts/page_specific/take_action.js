if( window.location.pathname == '/take-action/' || window.location.pathname == '/june23/'  || window.location.pathname == '/presidential-poll/'){

function makeActive($target_li){
  $target_li.addClass('active').siblings().removeClass('active');
  setHash($target_li)
}

function setAsComplete($target_li){
  $target_li.removeClass('incomplete');
  $target_li.addClass('complete').addClass('thanked');
  $form.find('button.btn').html('Thank You!');
  $form.find('button,input,textarea').prop('disabled', true);
}

function setHash($target){
  new_hash = $target.prop('class').replace(/^.+js-([\w-]+) .+/,"$1");
  location.hash = new_hash;
}

function loadTargetedAction(){
  if(location.hash.length > 1){
    hash_location = location.hash.replace(/^#/,'');
    $targetAction = $('.js-'+hash_location);
    makeActive($targetAction);
    $("html, body").animate({ scrollTop: $targetAction.offset().top }, 100);
  }
}

$(document).ready(function(){
  loadTargetedAction();

  $('.action-tree>li>.btn').on('click', function(e){
    e.preventDefault();
    $target = $(this).parents('li')
    makeActive($target);
  });
  $('.skip-next a.next').on('click', function(e){
    e.preventDefault();
    makeActive($(this).parents('li').next());
  });
  $('.skip-next a.done').on('click', function(e){
    e.preventDefault();
    setAsComplete($(this).parents('li'));
    makeActive($(this).parents('li').next());
    // makeActive($(this).parents('li').nextAll('li.incomplete'));
  });
});

}