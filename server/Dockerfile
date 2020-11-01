FROM node:12-alpine

WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm" "" ]