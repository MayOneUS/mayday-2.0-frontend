#!/bin/bash

# Deploys changes to the correct S3 bucket after build success

# Determine which bucket we should deploy to
if [[ "$TRAVIS_TAG" =~ 'alpha2' ]]; then
    echo "Deploying to alpha2.mayday.us"
    environment='alpha'
    export S3_BUCKET=alpha2.mayday.us
elif [[ "$TRAVIS_TAG" =~ 'alpha' ]]; then
    echo "Deploying to alpha.mayday.us"
    environment='alpha'
    export S3_BUCKET=alpha.mayday.us
elif [ "$TRAVIS_BRANCH" = "master" ]; then
    echo "Deploying to beta.mayday.us"
    environment='production'
    export S3_BUCKET=beta.mayday.us
elif [ "$TRAVIS_BRANCH" = "production" ]; then
    echo "Deploying to mayday.us"
    environment='production'
    export S3_BUCKET=mayday.us
else
    echo "This branch isn't tagged alpha, on master, or on production - not deploying anything."
    exit 0
fi

JEKYLL_ENV=$environment jekyll build
s3_website cfg apply --headless
s3_website push
