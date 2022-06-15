FROM alpine

RUN apk update
RUN apk add nodejs
RUN apk add npm
RUN npm install -g yarn nodemon
WORKDIR /app
