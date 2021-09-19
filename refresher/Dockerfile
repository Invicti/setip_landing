FROM ubuntu


ENV DEBIAN_FRONTEND=noninteractive
RUN apt -yq update
RUN apt -yq install nodejs
RUN apt -yq install npm
RUN apt -yq install wget
RUN apt -yq install git
RUN npm install n -g
RUN n latest
RUN npm install yarn -g
#copy the Node Reload server - exposed at port 4500
COPY ../package.json /tmp
COPY ../server.js /tmp
RUN cd /tmp && npm install 
EXPOSE 3000
EXPOSE 3000
RUN yarn global add parcel-bundler
COPY startUpScript.sh /tmp
COPY gitRefresh.sh /tmp
#CMD ["chmod", "+x",  "/tmp/gitRefresh.sh","chmod", "+x",  "/tmp/startUpScript.sh"]
#CMD ["chmod", "+x",  "/tmp/gitRefresh.sh"]
RUN /bin/bash -c 'chmod +x /tmp/gitRefresh.sh'
RUN /bin/bash -c 'chmod +x /tmp/startUpScript.sh'
#ENTRYPOINT ["sh", "/tmp/startUpScript.sh"]
#ENTRYPOINT ["sh"]
ENTRYPOINT ["/tmp/startUpScript.sh"]

