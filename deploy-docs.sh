#!/usr/bin/env bash


# These script is used for automating deployment of the docs folder to a
# local server in another repo.



# Define Variables. (YOU CAN CHANGE THESE)
#-----------------------------------------------------------
DIST_PROJECT_NAME="vue-state-validator"
DIST_FOLDER_LOCATION="$(pwd)/docs/src/.vuepress/dist"
REMOTE_WEBSITE_REPO="https://michaelolof@bitbucket.org/michaelolof/michaelolof-website.git"


# Define Variables (DON'T CHANGE THESE) 
# -----------------------------------------------------------
PROJECT_WORKING_DIR="$(pwd)"
PROD_WEBSITE_NAME="michaelolof-website"
TMP_WORKING_FOLDER="$HOME/.michaelolof.$PROD_WEBSITE_NAME"
PROD_WEBSITE_FOLDER_PATH="$TMP_WORKING_FOLDER/$PROD_WEBSITE_NAME"


# Check for Commit message.
if [[ -z $1 ]]; then
  echo "Please enter a commit message."
  echo "E.g ./deploy.sh \"Ready to go live.\""
  exit 1
fi

# Create temporary repo and pull from remote.
mkdir $TMP_WORKING_FOLDER && cd $TMP_WORKING_FOLDER
git clone $REMOTE_WEBSITE_REPO
cd $PROD_WEBSITE_FOLDER_PATH && git pull && git fetch

# Remove existing dist project if any
rm -rf $DIST_PROJECT_NAME && mkdir $DIST_PROJECT_NAME
cp -a "$DIST_FOLDER_LOCATION/." "./$DIST_PROJECT_NAME/"


# Initiat git commit process.
git add .
git commit -m "$1"
git push origin master

# Clean up temporary repo.
cd $PROJECT_WORKING_DIR
rm -rf $TMP_WORKING_FOLDER
echo "Finished deploying to $REMOTE_WEBSITE_REPO"