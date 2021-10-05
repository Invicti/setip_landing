#!/bin/sh
echo "-- Before First container startup --"
CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
TARGET_DIR=${APPLICATION_ROOT_DIRECTORY-''}

echo GITHUB_HOOK_SECRET: $GITHUB_HOOK_SECRET
echo DOCKER_APP_NAME: $DOCKER_APP_NAME
echo GITHUB_WEBHOOK_PATH: $GITHUB_WEBHOOK_PATH
echo APP_EXTERNAL_LISTEN_IP: $APP_EXTERNAL_LISTEN_IP
echo GITHUB_EXTERNAL_LISTEN_IP: $GITHUB_EXTERNAL_LISTEN_IP
echo APP_EXTERNAL_LISTEN_PORT: $APP_EXTERNAL_LISTEN_PORT
echo GITHUB_EXTERNAL_LISTEN_PORT: $GITHUB_EXTERNAL_LISTEN_PORT
echo APP_RELOAD_PATH: $APP_RELOAD_PATH


if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
    touch $CONTAINER_ALREADY_STARTED
    echo "-- First container startup --"
    # this branch is only executed when the container is first started
    cd /tmp
    # prepare the actual Node app from GitHub
    mkdir app
    git clone $GITHUB_URL app
    echo "GIT repo was cloned to /tmp/app/${APP_RELOAD_PATH}"
    cd /tmp/app/$APP_RELOAD_PATH
    npm install parcel@next --include=dev 
    #install dependencies for the Node app
    npm install
    #start  both the reload app (in the background) and (using nodemon) the actual Node app
    cd /tmp
    echo "starting gitreload and npm  run-script dev. New."
    (echo "start reload"&& npm  run-script dev&& echo "reload app finished") & 
    echo "starting npm  run-script dev for app cloned from $GITHUB_URL in /tmp/app/${TARGET_DIR}";
    if [ ! -z $APP_RELOAD_PATH ]; then
        cd /tmp/app/; 
    else
        cd /tmp/app/$APP_RELOAD_PATH; 
    fi
    rm -fr .parcel-cache&& npm  run-script dev;
else
    echo "-- Not first container startup --"
    cd /tmp
    (echo "start reload";npm run-script dev; echo "starting app finished") &
    
    echo "starting app's startup npm dev script cloned from $GITHUB_URL in directory /tmp/app/${APP_RELOAD_PATH}";
    if [ ! -z $APP_RELOAD_PATH ]; then
        cd /tmp/app/$APP_RELOAD_PATH; 
    else
        cd /tmp/app/$APP_RELOAD_PATH; 
    fi
    rm -fr .parcel-cache&& npm  run-script dev;
fi

