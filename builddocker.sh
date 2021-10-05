#!/bin/sh
MAIN_TAG="0.1.2"
TAG="${MAIN_TAG:-latest}"
IMAGE="live-reload"
REPO="invictieu"
GITHUB_URL="https://github.com/Invicti/setip_landing.git"
GITHUB_HOOK_SECRET="changethisDa#$it"
DOCKER_APP_NAME="livereload"
ARG_APP_RELOAD_PATH=
APP_EXTERNAL_LISTEN_PORT=3000
APP_EXTERNAL_LISTEN_IP=173.21.4.2

TAG=${TAG/+/-}

docker build -t "${REPO}/${IMAGE}:$TAG" .
docker push "${REPO}/${IMAGE}:$TAG"
set -x
docker rm /$DOCKER_APP_NAME -f
set +x
docker run -it  \
--name ${DOCKER_APP_NAME} \
-p 173.21.4.2:3000:3000 \
-p 173.21.4.2:4500:4500  \
-e GITHUB_URL=${GITHUB_URL}  \
-e GITHUB_HOOK_SECRET=${GITHUB_HOOK_SECRET}  \
-e ARG_APP_RELOAD_PATH=${ARG_APP_RELOAD_PATH}  \
-e APP_EXTERNAL_LISTEN_PORT=${APP_EXTERNAL_LISTEN_PORT} \
-d "${REPO}/${IMAGE}:$TAG"


