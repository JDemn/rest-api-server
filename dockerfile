FROM alpine:3.18.2 as base


RUN apk update && \
    apk add --no-cache nodejs npm 

WORKDIR /home/app

COPY package*.json ./
RUN npm ci --only=production
COPY . /home/app/

ARG MONGODB_CNN
ARG SECRETORPRIVATEKEY

ENV MONGODB_CNN=$MONGODB_CNN
ENV SECRETORPRIVATEKEY=$SECRETORPRIVATEKEY

RUN npm install dotenv

EXPOSE 8083

ENTRYPOINT [ "npm","start" ]
