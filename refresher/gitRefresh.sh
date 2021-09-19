./#!/bin/sh
cd /tmp/app
git pull 
#install dependencies for the Node app
echo "Installing dependencies..."
npm install
echo "Dependencies installed."
