#!/bin/sh
MAIN_TAG="0.1.4"
TAG="${MAIN_TAG:-latest}"
IMAGE="live-reload"
REPO="invictieu"
GITHUB_URL=https://github.com/Invicti/setip_landing.git
GITHUB_HOOK_SECRET="changethisDa#$it"
DOCKER_APP_NAME="live-reload"
GITHUB_WEBHOOK_PATH="/githook"
APP_RELOAD_PATH=""
APP_EXTERNAL_LISTEN_IP=0.0.0.0
GITHUB_EXTERNAL_LISTEN_IP=0.0.0.0
APP_EXTERNAL_LISTEN_PORT=3000
GITHUB_EXTERNAL_LISTEN_PORT=4500

TAG=${TAG/+/-}

set +xe

git add -A
if ! git diff-index --quiet HEAD; then
  git commit -m "auto-commit runlocal.sh"
  git push origin main
fi
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
#     "cd ${PWD}/&& npm install&& npm run-script dev --LISTEN_PORT=${APP_EXTERNAL_LISTEN_PORT}" \
#     "cd ${PWD}/refresher&& npm install&& npm start"



# Comment below to build docker and run
docker build -t "${REPO}/${IMAGE}:$TAG" \
--build-arg GITHUB_URL=$GITHUB_URL \
--build-arg GITHUB_HOOK_SECRET=$GITHUB_HOOK_SECRET \
--build-arg DOCKER_APP_NAME=$DOCKER_APP_NAME \
--build-arg APP_RELOAD_PATH=$APP_RELOAD_PATH \
--build-arg GITHUB_WEBHOOK_PATH=$GITHUB_WEBHOOK_PATH \
--build-arg APP_EXTERNAL_LISTEN_IP=$APP_EXTERNAL_LISTEN_IP \
--build-arg GITHUB_EXTERNAL_LISTEN_IP=$GITHUB_EXTERNAL_LISTEN_IP \
--build-arg APP_EXTERNAL_LISTEN_PORT=$APP_EXTERNAL_LISTEN_PORT \
--build-arg GITHUB_EXTERNAL_LISTEN_PORT=$GITHUB_EXTERNAL_LISTEN_PORT \
.  # --no-cache




# replace by your own docker repo if needed
docker push "${REPO}/${IMAGE}:$TAG"

docker rm /${DOCKER_APP_NAME} -f

# Run setip.io API to get an IP and end points.
# It will return the endpoint IPS that can be inserted
# below in place of the IPs.


docker run -it  \
--name ${DOCKER_APP_NAME} \
--entrypoint tmp/startUpScript.sh \
  -p ${APP_EXTERNAL_LISTEN_IP}:${APP_EXTERNAL_LISTEN_PORT}:3000 \
  -p ${GITHUB_EXTERNAL_LISTEN_IP}:${GITHUB_EXTERNAL_LISTEN_PORT}:4500  \
  -e GITHUB_URL=${GITHUB_URL}  \
  -e GITHUB_HOOK_SECRET=${GITHUB_HOOK_SECRET}  \
  -e DOCKER_APP_NAME=${DOCKER_APP_NAME}  \
  -e GITHUB_WEBHOOK_PATH=${GITHUB_WEBHOOK_PATH}  \
  -e APP_RELOAD_PATH=${APP_RELOAD_PATH}  \
  -e APP_EXTERNAL_LISTEN_PORT=${APP_EXTERNAL_LISTEN_PORT} \
  -e APP_EXTERNAL_LISTEN_IP=${APP_EXTERNAL_LISTEN_IP} \
  -e GITHUB_EXTERNAL_LISTEN_PORT=${GITHUB_EXTERNAL_LISTEN_PORT} \
  -e GITHUB_EXTERNAL_LISTEN_IP=${GITHUB_EXTERNAL_LISTEN_IP} \
  -d "${REPO}/${IMAGE}:$TAG" 

docker logs ${DOCKER_APP_NAME} -f


