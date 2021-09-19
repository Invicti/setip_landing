FROM ubuntu


ARG ARG_GITHUB_WEBHOOK_KEY=
ENV GITHUB_WEBHOOK_KEY=ARG_GITHUB_WEBHOOK_KEY

ARG ARG_GITHUB_WEBHOOK_PATH=
ENV GITHUB_WEBHOOK_PATH=ARG_GITHUB_WEBHOOK_PATH

ARG ARG_RELOAD_PATH=
ENV RELOAD_PATH=ARG_RELOAD_PATH

ARG ARG_LISTEN_PORT=
ENV LISTEN_PORT=ARG_LISTEN_PORT



RUN apt -yq update
RUN apt -yq install nodejs
RUN apt -yq install npm
RUN apt -yq install wget
RUN apt -yq install git
RUN npm install n -g
RUN n latest
RUN npm install yarn -g
COPY refresher/package.json /tmp
COPY refresher/gitserver.js /tmp
RUN cd /tmp && npm install 
EXPOSE 3000
EXPOSE 4500
RUN yarn global add parcel
COPY refresher/startUpScript.sh /tmp
COPY refresher/gitRefresh.sh /tmp
CMD ["chmod", "+x",  "/tmp/gitRefresh.sh"]
RUN /bin/bash -c 'chmod +x /tmp/startUpScript.sh&& chmod +x /tmp/startUpScript.sh'
ENTRYPOINT ["/tmp/startUpScript.sh"]

