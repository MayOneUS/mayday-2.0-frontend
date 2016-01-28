function render_blog_feed(){
  $.getJSON(blog_post_feed_url, function (data) {
    var posts = data.posts;
    var $posts = $('#tumblr-posts');

    posts.forEach(function(post, index) {
      var rendered_html = HandlebarsTemplates['cards/blog-post'](post);
      $posts.append(rendered_html);
    });
  });
} // end render_blog_feed

function render_press_releases_feed(){
  $.getJSON(press_releases_feed_url, function (data) {
    var releasePosts = data.posts;
    var $releasesContainer = $('#tumblr-press-releases');

    releasePosts.forEach(function(post, index) {
      post['date'] = americanDateFormat(post['date']);
      post['regular-title'] = post['regular-title'].replace('PRESS RELEASE - ','')
      var rendered_html = HandlebarsTemplates['cards/press-release'](post);
      $releasesContainer.append( rendered_html );
    });
  });
} // end render_press_releases_feed
