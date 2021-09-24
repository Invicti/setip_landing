#!/bin/sh
MAIN_TAG="0.1.1"
TAG="${MAIN_TAG:-latest}"
IMAGE="live-reload"
REPO="invictieu"
GITHUB_URL=https://github.com/Invicti/setip_landing.git
GITHUB_HOOK_SECRET=your_secret
DOCKER_APP_NAME="changethisDa#$it"

TAG=${TAG/+/-}

docker build -t "${REPO}/${IMAGE}:$TAG" .
docker push "${REPO}/${IMAGE}:$TAG"

docker rm /node-app -f
docker run -it  \
--name ${DOCKER_APP_NAME} \
-p 173.21.4.2:3000:3000 \
-p 173.21.4.2:4500:4500  \
-e GITHUB_URL=${GITHUB_URL}  \
-e GITHUB_URL=${GITHUB_URL}  \
-e GITHUB_URL=${GITHUB_URL}  \
-e GITHUB_URL=${GITHUB_URL}  \
-d "${REPO}/${IMAGE}:$TAG"


