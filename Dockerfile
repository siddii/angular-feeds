FROM node:argon
MAINTAINER siddii


RUN apt-get update npm install -g grunt \
    && mkdir -p /usr/src/app \
    && chown node:node /usr/src/app/

USER node

WORKDIR /usr/src/app

RUN npm install

VOLUME [".":"/usr/src/app/"]

CMD ["grunt", "server"]
