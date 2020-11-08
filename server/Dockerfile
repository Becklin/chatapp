FROM node:12-alpine

ENV MONGO_DB=easychat
ENV MONGO_PW=e9RhsBIe5PIOx7d7
ARG DOCKER_ENV
ENV PORT=5000
ENV NODE_ENV = ${DOCKER_ENV}
WORKDIR /Users/beck.lin/chatapp/server
#WORKDIR /usr/src/chatapp

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "node", "index.js" ]