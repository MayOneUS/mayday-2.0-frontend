md.takeAction = {};
(function(takeAction) {
  takeAction.makeActive = function ($target_li){
    $target_li.addClass('active').siblings().removeClass('active');
    takeAction.setHash($target_li)
  }

  takeAction.setAsComplete = function ($target_li){
    $target_li.removeClass('incomplete');
    $target_li.addClass('complete').addClass('thanked');
    $form.find('button.btn').html('Thank You!');
    $form.find('button,input,textarea').prop('disabled', true);
  }

  takeAction.setHash = function ($target){
    new_hash = $target.prop('class').replace(/^.+js-([\w-]+) .+/,"$1");
    location.hash = new_hash;
  }

  takeAction.loadTargetedAction = function (){
    if(urlHasFragment()){
      hash_location = getUrlFragment();
      $targetAction = $('.js-'+hash_location);
      takeAction.makeActive($targetAction);
      $("html, body").animate({ scrollTop: $targetAction.offset().top }, 100);
    }
  }

  takeAction.initialize = function(){
    takeAction.loadTargetedAction();

    $('.action-tree>li>.btn').on('click', function(e){
      e.preventDefault();
      $target = $(this).parents('li')
      takeAction.makeActive($target);
    });
    $('.skip-next a.next').on('click', function(e){
      e.preventDefault();
      takeAction.makeActive($(this).parents('li').next());
    });
    $('.skip-next a.done').on('click', function(e){
      e.preventDefault();
      setAsComplete.setAsComplete($(this).parents('li'));
      takeAction.makeActive($(this).parents('li').next());
      // takeAction.makeActive($(this).parents('li').nextAll('li.incomplete'));
    });
  }
})(md.takeAction);
