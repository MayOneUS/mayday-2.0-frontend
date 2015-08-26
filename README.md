# mayday-2.0-frontend

[![Build Status](https://travis-ci.org/MayOneUS/mayday-2.0-onboarding.svg?branch=master)](https://travis-ci.org/MayOneUS/mayday-2.0-onboarding)

Front-end repository for the MAYDAY 2.0 site. Built with [Jekyll](http://jekyllrb.com/) and hosted on [Amazon S3](http://aws.amazon.com/s3/).

## Getting started.

This site is built with the Ruby library [Jekyll](http://jekyllrb.com) - it's a HTML/CSS preprocessor that supports limited plugins.  You'll need that on your computer to hack on the code. If you don't already have ruby installed, we recommend installing it with [RVM](https://rvm.io/rvm/install).

1. Install ruby. Any 2.1+ version should be fine.
1. Install bundler if it isn't already installed with `gem install bundler`
1. Run `bundle install` to install dependent gems, including the Jekyll library (which is a gem)
1. Run `jekyll server` to get the server up and running.
1. Check out http://localhost:4000/ to see the site up and running.  Any update you make to the source files should be reflected in localhost virtually immediately.

If you run into execjs error `'autodetect': Could not find a JavaScript runtime.` You can confirm the following gems are installed or installing NodeJS will install a compatiable javascript runtime. 
  1. `gem install execjs`
  1. `gem install therubyracer`
    * execjs requires a js runtime and therubyracer installs a v8 javascript runtime
  [j_issue]: https://github.com/jekyll/jekyll/issues/2327

Note: Non-intel machines may have additional issues. [Jekyll issue 2327][j_issue]

## Contributing & Code Review Process

Goal: Ensure at least two parties have reviewed any code commited for "production."

### Process:
1. Branch off any new feature development
2. Regularly commit to your branch.
3. When code is ready to be merged, create merge request.  Merge request should be able to be merged by github and all/any tests should be passing.
4. Assign another developer to review your merge request.
5. Merge request is reviewed and made on github.

## Hosting, Deployments, and Continuous Integration

We use Amazon's Simple Storage Service (S3) to host this site. Here are the URLs for each environment:

- **Alpha:** http://alpha.mayday.us/ (automatically receives changes to `alpha` branch)
- **Beta/Master:** http://beta.mayday.us/ (automatically receives changes to `master` branch)
- **Production:** https://mayday.us (automatically receives changes to `production` branch)

We use the [s3_website](https://github.com/laurilehmijoki/s3_website) project to deploy this site.

You can see the build details and history here: https://travis-ci.org/MayOneUS/mayday-2.0-frontend

To manually deploy to production, follow these steps:

1. Fetch and merge the latest code from the **production** branch to your machine
1. Run `jekyll build`
1. Make sure the credentials for the AWS S3 production deploy user are in your `.env` file (ask another MAYDAY tech team member if you don't have these)
1. Install the s3_website gem with `gem install s3_website` if you haven't already
1. Run `s3_website push` to deploy the new code

If you have added new redirects to the `s3_website.yml` file, you will also need to run `s3_website cfg apply`.

## License

This project is open source under the [Apache License 2.0](LICENSE).

Note that while this license allows code reuse, it does not permit reuse of Mayday PAC branding or logos. If you reuse this project, you may need to remove Mayday PAC branding from the source code.
