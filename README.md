# mayday-2.0-frontend

[![Build Status](https://travis-ci.org/MayOneUS/mayday-2.0-onboarding.svg?branch=master)](https://travis-ci.org/MayOneUS/mayday-2.0-onboarding)

Front-end repository for the MAYDAY 2.0 site. Built with [Jekyll](http://jekyllrb.com/) and hosted on [Amazon S3](http://aws.amazon.com/s3/).

## Getting started.

This site is built with the Ruby library [Jekyll](http://jekyllrb.com) - it's a HTML/CSS preprocessor that supports limited plugins.  You'll need that on your computer to hack on the code. If you don't already have ruby installed, we recommend installing it with [RVM](https://rvm.io/rvm/install).  Then install jekyll `gem install jekyll`. Finally, to run it locally just run `jekyll serve --watch`, it'll update when you change the code.

Running jekyll may require the following gems if you run into execjs error `'autodetect': Could not find a JavaScript runtime.` Alternatively installing NodeJS will install a compatiable javascript runtime. And non-intel machines may have issues. [Jekyll issue 2327][j_issue]
  1. `gem install execjs`
  1. `gem install therubyracer`
    * execjs requires a js runtime and therubyracer installs a v8 javascript runtime
  [j_issue]: https://github.com/jekyll/jekyll/issues/2327

## Code Review Process

Goal: Ensure at least two parties have reviewed any code commited for "production."

### Process:
1. Branch off any new feature development
2. Regularly commit to your branch.
3. When code is ready to be merged, create merge request.  Merge request should be able to be merged by github and all/any tests should be passing.
4. Assign another developer to review your merge request.
5. Merge request is reviewed and made on github.

## Hosting, Deployments, and Continuous Integration

We use Amazon's Simple Storage Service (S3) to host this site. Here are the URLs:

- **Staging:** https://frontend-staging.mayday.us/
- **Step Two Staging:** https://step-two.mayday.us/
- **Production:** https://mayday.us

We use the [s3_website](https://github.com/laurilehmijoki/s3_website) project to deploy this site. [Travis CI](https://travis-ci.org/) will automatically deploy all code in the `master` branch to the staging site. Travis will also automatically deploy all code in the `m2` branch to the step two staging site.

You can see the build details and history here: https://travis-ci.org/MayOneUS/mayday-2.0-frontend

To deploy to production, follow these steps:

1. Fetch and merge the latest code from the **master** branch to your machine
1. Run `jekyll build`
1. Make sure the credentials for the AWS S3 production deploy user are in your `.env` file (ask another MAYDAY tech team member if you don't have these)
1. Install the s3_website gem with `gem install s3_website` if you haven't already
1. Run `s3_website push`

If you have added new redirects to the `s3_website.yml` file, you will also need to run `s3_website cfg apply`.

## License

This project is open source under the [Apache License 2.0](LICENSE).

Note that while this license allows code reuse, it does not permit reuse of Mayday PAC branding or logos. If you reuse this project, you may need to remove Mayday PAC branding from the source code.
