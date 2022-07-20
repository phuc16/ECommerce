FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . .

EXPOSE 5000

CMD ['node', 'index.js']