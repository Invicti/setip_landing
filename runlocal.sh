#!/bin/sh
MAIN_TAG="0.1.1"
TAG="${MAIN_TAG:-latest}"
IMAGE="live-reload"
REPO="invictieu"
GITHUB_URL=https://github.com/Invicti/setip_landing.git
GITHUB_HOOK_SECRET="changethisDa#$it"
DOCKER_APP_NAME="live-reload"
GITHUB_WEBHOOK_PATH="/githook"
APP_EXTERNAL_LISTEN_IP=173.21.4.2
GITHUB_EXTERNAL_LISTEN_IP=173.21.4.2
APP_EXTERNAL_LISTEN_PORT=3001
GITHUB_EXTERNAL_LISTEN_PORT=4500

TAG=${TAG/+/-}



# comment below to use this script to run your app locally.
# this will:
# 1. run an install npm in the current directory with existing code in the repo.
#
# 2. run the script named "dev" defined in the package.json "script" section.
#    You can set that "dev" valuer in package.json to anything command and it 
#    will execute, its not only for node js.
#
# 3. run the hook server for git hub on port 4500. Make sure you set GITHUB_HOOK_SECRET
#
# 4. Pull code from the Github repository indicated at in GITHUB_URL each time github
#   sends a webhook after a commit is pushed to that repository.
#   IMPORTANT: MANDATORY VALUES TO SET ARE:
#
#     - GITHUB_WEBHOOK_PATH to the same path you set in your Hook preferences
#       for that repository on Github.
#
#     - GITHUB_HOOK_SECRET must be the same as the secret you set in your Hook preferences
#       for that repository on Github.

# concurrently \
#     "cd ${PWD}/&& npm install&& npm run-script dev --LISTEN_PORT=${LISTEN_PORT}" \
#     "cd ${PWD}/refresher&& npm install&& npm start"



# Comment below to build docker and run
docker build -t "${REPO}/${IMAGE}:$TAG" .

# replace by your own docker repo if needed
# docker push "${REPO}/${IMAGE}:$noTAG"

docker rm /${DOCKER_APP_NAME} -f

# Run setip.io API to get an IP and end points.
# It will return the endpoint IPS that can be inserted
# below in place of the IPs.

docker run -it  \
--name ${DOCKER_APP_NAME} \
    -p ${APP_EXTERNAL_LISTEN_IP}:${APP_EXTERNAL_LISTEN_PORT}:3000 \
    -p ${GITHUB_EXTERNAL_LISTEN_IP}:${GITHUB_EXTERNAL_LISTEN_PORT}:4500  \
    -e GITHUB_URL=${GITHUB_URL}  \
    -e GITHUB_HOOK_SECRET=${GITHUB_HOOK_SECRET}  \
    -e DOCKER_APP_NAME=${DOCKER_APP_NAME}  \
    -e GITHUB_WEBHOOK_PATH=${GITHUB_WEBHOOK_PATH}  \
    -e LISTEN_PORT=${LISTEN_PORT} \
    -d "${REPO}/${IMAGE}:$TAG"

docker logs ${DOCKER_APP_NAME} -f


