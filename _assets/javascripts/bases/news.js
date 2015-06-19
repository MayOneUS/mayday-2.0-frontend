if( window.location.pathname == '/news/' ){

  (function($, ich) {
    var url = '{{site.blog_post_feed_url}}';

    $.getJSON(url, function (data) {
      var posts = data.posts;
      var $posts = $('#tumblr-posts');

      posts.forEach(function(post, index) {
        $posts.append( ich.post(post) );
      });
    });

    var url = '{{site.press_releases_feed_url}}';

    $.getJSON(url, function (data) {
      var releasePosts = data.posts;
      var $releasesContainer = $('#tumblr-press-releases');

      releasePosts.forEach(function(post, index) {
        d = new Date(post['date']);
        post['date'] = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();
        post['regular-title'] = post['regular-title'].replace('PRESS RELEASE - ','')
        $releasesContainer.append( ich.press_release(post) );
      });
    });
  })(jQuery, ich);

}