md.newsFeeds = {};
(function(newsFeeds) {
  var blogFeedUrl = services_url + '/blog_posts'
  newsFeeds.renderResults = function (posts, templateName, container, resultLength) {
    resultLength = resultLength || 10;
    posts.forEach(function(post, index) {
      if(post['type'] == 'regular' && index < resultLength){
        post['date'] = maydayDateFormat(post['date']);
        post['regular-title'] = (post['regular-title'] || '').replace('PRESS RELEASE - ','')
        post['regular-body'] = stripParagraphTags($.truncate(post['regular-body'] || '', {length: 300, words: true }));
        var rendered_html = HandlebarsTemplates[templateName](post);
        container.append( rendered_html );
      }
    });
  }

  newsFeeds.renderBlogFeed = function(){
    $.getJSON(blogFeedUrl, function (data) {
      newsFeeds.renderResults(data.posts, 'cards/blog-post', $('#tumblr-posts'))
    });
  }

  newsFeeds.renderPressReleasesFeed = function(){
    var pressReleasesFeedUrl = blogFeedUrl + '/press_releases';
    $.getJSON(pressReleasesFeedUrl, function (data) {
      newsFeeds.renderResults(data.posts, 'cards/blog-post', $('#tumblr-press-releases'))
    });
  }

  newsFeeds.renderHomepageBlogFeed = function(container_selector) {
    $.getJSON(blogFeedUrl, function (data) {
      newsFeeds.renderResults(data.posts, 'cards/homepage-blog-post', $(container_selector), 3)
    });
  }
})(md.newsFeeds);