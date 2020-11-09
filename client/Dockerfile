FROM node:12-alpine

WORKDIR /Users/beck.lin/chatapp/client

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]