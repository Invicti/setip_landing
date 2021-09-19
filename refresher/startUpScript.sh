#!/bin/sh
echo "-- Before First container startup --"
CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
TARGET_DIR=${APPLICATION_ROOT_DIRECTORY-''}
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
    touch $CONTAINER_ALREADY_STARTED
    echo "-- First container startup --"
    # this branch is only executed when the container is first started
    cd /tmp
    # prepare the actual Node app from GitHub
    mkdir app
    git clone $GITHUB_URL app
    echo "GIT repo was cloned to /tmp/app/${TARGET_DIR}"
    cd /tmp/app/$TARGET_DIR
    #install dependencies for the Node app
    npm install
    #start  both the reload app (in the background) and (using nodemon) the actual Node app
    cd /tmp
    echo "starting reload app and nodemon"
    (echo "start reload";npm start; echo "reload app finished") & 
    cd /tmp/app/$TARGET_DIR; 
    echo "starting npm for app cloned from $GITHUB_URL in /tmp/app/${TARGET_DIR}";
    if [ ! -z $APP_STARTUP ]; then
        cd /tmp/app/$TARGET_DIR; 
        npm  run-script dev
    else
        cd /tmp/app/$TARGET_DIR/$APP_STARTUP; 
        npm  run-script dev
        #parcel --host 0.0.0.0 --port 3000 /tmp/app/$TARGET_DIR/index.html
    fi
    
else
    echo "-- Not first container startup --"
    cd /tmp
    (echo "start reload";npm start; echo "reload app finished") &
    
    echo "starting app's startup npm dev script cloned from $GITHUB_URL in directory /tmp/app/${TARGET_DIR}";
    if [ ! -z $APP_STARTUP ]; then
        cd /tmp/app/$TARGET_DIR; 
        npm  run-script dev
    else
        cd /tmp/app/$TARGET_DIR/$APP_STARTUP; 
        npm  run-script dev
        #parcel --host 0.0.0.0 --port 3000 /tmp/app/$TARGET_DIR/index.html
    fi
fi

