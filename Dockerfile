FROM node:argon
MAINTAINER siddii


RUN apt-get update && npm update -g && npm install -g grunt \
    && mkdir -p /usr/src/app \
    && chown node:node /usr/src/app/

WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install

USER node

VOLUME [".":"/usr/src/app/"]

CMD ["grunt", "server"]
