FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install

RUN mkdir -p /usr/src/app

ADD src /usr/src/app/src

ADD public /usr/src/app/public

EXPOSE 3000

CMD ['npm', 'start']