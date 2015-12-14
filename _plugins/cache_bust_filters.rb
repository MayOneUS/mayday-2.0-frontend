# Note: Github doesn't allow plugins to execute (safemode). These filters won't work on github pages.
module Jekyll
  module CacheBustFilters

    # Gets Md5 contents of target file (assumed to be using the full path)
    # and appends a hash end of to asset file reference. Ensures deployed
    # asset files are "cachebust-ed" every time the file changes
    def md5_cache_bust(file_name)
      require 'digest/md5'
      file_name + '?' + Digest::MD5.file(file_name).hexdigest
    end

    # Gets Md5 contents of all sass assets (assumed to be in /_sass/ )
    # and appends a hash end of the target asset file. Ensures deployed
    # sass bassed CSS files are "cachebust-ed" every time the files change
    def sass_cache_bust(file_name)
      require 'digest/md5'
      file_contents = Dir.glob("_sass/*").map{|f| File.read(f) }.join
      file_name + '?' + Digest::MD5.hexdigest(file_contents)
    end

    # Gets Md5 contents of all js assets in _assets/javascripts/
    # and appends a hash end of the target asset file. Ensures deployed
    # files are "cachebust-ed" every time the files change. Using
    # jekyll-assests requires first capturing the asset_path string, and
    # passing the path to this filter in a subsequent liquid call
    def js_cache_bust(file_name)
      require 'digest/md5'
      file_contents = Dir.glob("_assets/javascripts/**/*").map{|f| File.read(f) unless File.directory?(f) }.join
      file_name + '?' + Digest::MD5.hexdigest(file_contents)
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBustFilters)