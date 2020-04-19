FROM node:12
MAINTAINER OPSKUBE
LABEL maintainer "OPSKUBE"
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install

