module Jekyll
  module MyFilters
    # Github doesn't allow plugins to execute (safemode). This plugin would require an infrastructure change to be reliable.
    #
    # Gets Md5 contents of file (assumed to be using the full path)
    # and returns the hash to be appended to any CSS file
    # when used with css file, automatically makes sure that deployed CSS
    # is cachebust every time the file changes
    def md5_cache_bust(file_name)
      require 'digest/md5'
      file_name + '?' + Digest::MD5.file(file_name).hexdigest
    end
  end
end

Liquid::Template.register_filter(Jekyll::MyFilters)
