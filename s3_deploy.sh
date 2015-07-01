#!/bin/bash

# Deploys changes to the correct S3 bucket after build success

# Determine which bucket we should deploy to
if [ "$TRAVIS_BRANCH" = "alpha" ]; then
    echo "Going to deploy to alpha.mayday.us"
    export S3_BUCKET=alpha.mayday.us
elif [ "$TRAVIS_BRANCH" = "master" ]; then
    echo "Going to deploy to beta.mayday.us"
    export S3_BUCKET=beta.mayday.us
elif [ "$TRAVIS_BRANCH" = "production" ]; then
    echo "Going to deploy to mayday.us"
    export S3_BUCKET=mayday.us
else
    # This branch isn't one we want to deploy
    exit 0
fi

jekyll build
s3_website cfg apply --headless
s3_website push
