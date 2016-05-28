# After build uglifier
#
### WHY
# Sprokets won't allow us to digest our js and use custom
# cachebusting or fingerprinting of our files.  In order
# to allow third party services to fetch our files, we need
# assets available at stable urls - we need: app.js?xxx not
# app-xxx.js to be generated.
#
### SOLUTION
# We turn off digesting in sprokets, use a plug to create a
# custom md5 cachebusting cache, and use this plugin to
# minify assets after writing the site
if ENV['JEKYLL_ENV'] == 'production'
  Jekyll::Hooks.register :site, :post_write do |post|
    require 'uglifier'

    target_assets = Dir.glob('_site/assets/*.js').select {|f| File.file?(f)}
    target_assets .each do |file|
      minified_file = Uglifier.new.compile(File.read(file))
      minified_file_name = file.gsub!('.js','.min.js')
      puts 'Minfiying js manually...'
      File.open(minified_file_name, 'w') do |file|
        file.write(minified_file)
      end
      puts 'Gzipping js manually...'
      Zlib::GzipWriter.open(minified_file_name + '.gz') do |gz|
        gz.write minified_file
      end
    end
  end
end