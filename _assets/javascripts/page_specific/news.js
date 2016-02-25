md.newsFeeds = {};
(function(newsFeeds) {
  newsFeeds.renderResults = function (posts, container) {
    posts.forEach(function(post, index) {
      if(post['type'] == 'regular'){
        post['date'] = maydayDateFormat(post['date']);
        post['regular-title'] = (post['regular-title'] || '').replace('PRESS RELEASE - ','')
        var rendered_html = HandlebarsTemplates['cards/blog-post'](post);
        container.append( rendered_html );
      }
    });
  }

  newsFeeds.renderBlogFeed = function(){
    $.getJSON(blogFeedUrl, function (data) {
      newsFeeds.renderResults(data.posts, $('#tumblr-posts'))
    });
  }

  newsFeeds.renderPressReleasesFeed = function(){
    var pressReleasesFeedUrl= blogFeedUrl +'/press_releases';
    $.getJSON(pressReleasesFeedUrl, function (data) {
      newsFeeds.renderResults(data.posts, $('#tumblr-press-releases'))
    });
  }
})(md.newsFeeds);