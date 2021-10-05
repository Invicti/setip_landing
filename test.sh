#!/bin/sh

NODE_ENV=production
GITHUB_URL=https://github.com/Invicti/setip_landing.git
GITHUB_HOOK_SECRET=changemenow###
DOCKER_APP_NAME="live-reload"
GITHUB_WEBHOOK_PATH="/githook"
APP_RELOAD_PATH=
APP_EXTERNAL_LISTEN_IP=173.21.4.2
GITHUB_EXTERNAL_LISTEN_IP=0.0.0.0
APP_EXTERNAL_LISTEN_PORT=3000
GITHUB_EXTERNAL_LISTEN_PORT=4500
parcel --host ${APP_EXTERNAL_LISTEN_IP} --port ${APP_EXTERNAL_LISTEN_PORT} index.html
cd /refresher
node gitserver.js