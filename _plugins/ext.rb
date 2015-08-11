require 'jekyll-assets'
require 'handlebars_assets'

env = Sprockets::Environment.new
env.append_path HandlebarsAssets.path