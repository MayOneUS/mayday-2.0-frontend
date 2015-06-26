if( window.location.pathname == '/the-plan/' ){

smoothScroll.init({
  speed: 500,
  offset: 198,
  updateURL: false,
  callbackBefore: function ( toggle, anchor ) {},
  callbackAfter: function ( toggle, anchor ) {}
});

$(document).ready(function(){


  var didScroll = false,

      // capture links on the page
      $link1 = $('#link1'),
      $link2 = $('#link2'),
      $link3 = $('#link3'),
      $link4 = $('#link4'),
      // capture capture the from the first link to reduce the number of dom objects to watch
      // for a better frame rate
      secondlinkOffset = $link2.offset().top - $link1.offset().top,
      thridlinkOffset = $link3.offset().top - $link1.offset().top,
      forthlinkOffset = $link4.offset().top - $link1.offset().top,

      // capture the whole fixed menu
      $stickyLinks = $(".sticky-tree"),

      // objects in the dom that need to be watched
      $container0 = $('#opening'),
      $container1 = $('#problem'),
      $container2 = $('#solution'),
      $container3 = $('#challenge'),
      $container4 = $('#labratory'),

      $stars = $( '.sticky-star' ),
      $starText = $( '.sticky-text' );



  animate = {
    current : null,
    lockInPalace : false,

    positionCheck: function () {
      var firstLink = $link1.offset().top,
          lastContainer = $container4,
          lastContainerTop = lastContainer.offset().top;

      if( lastContainerTop < firstLink + forthlinkOffset ) {
        animate.toggle($link4, 4);
      } else if ( $container3.offset().top < firstLink + thridlinkOffset ) {
        animate.toggle($link3, 3);
      } else if ( $container2.offset().top < firstLink + secondlinkOffset ) {
        animate.toggle($link2, 2);
      } else if ( $container1.offset().top < firstLink ) {
        animate.toggle($link1, 1);
      } else if ( $container0.offset().top < firstLink ) {
        animate.toggle($link1, 1);
      }

      animate.menuLock(firstLink, lastContainer, lastContainerTop);
    },
    makeActive : function ($target_el, number){
      if ( animate.current !== number) {
        $stars.removeClass(' active' );
        $starText.removeClass( 'active' );
        $target_el.children( '.sticky-star').addClass( 'active' );
        $target_el.children( '.sticky-text' ).addClass( 'active' );
        animate.current = number;
      }
    },
    menuLock : function (firstLink, lastContainer, lastContainerTop) {
      if ( animate.lockInPalace === false && ( lastContainerTop < firstLink - 10 )){
        animate.lockInPalace = true;
        $stickyLinks.addClass('unstuck').css('top',lastContainerTop);

      } else if ( animate.lockInPalace === true && (window.scrollY +198 < lastContainerTop)) {
        animate.lockInPalace = false;
        $stickyLinks.removeClass('unstuck').css('top',198 + 'px');
      }
    },
    toggle : function ($target_el, number){
     animate.makeActive($target_el, number)
    }
  }
  $(window).load(function() {
      animate.positionCheck();
  });

  $(window).scroll(function() {// important
      didScroll = true;
  });

  setInterval(function() {// limits the positionCheck() to every 150 milli seconds
    if(didScroll) {
      didScroll = false;
      animate.positionCheck();
    }
  }, 60);// important
});

}