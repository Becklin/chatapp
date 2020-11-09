FROM node:12-alpine

ENV MONGO_DB=easychat
ENV MONGO_PW=e9RhsBIe5PIOx7d7
ENV AWS_ACCESS_KEY_ID=AKIAU6BDW46ZQG7FCAOQ
ENV AWS_SECRET_ACCESS_KEY=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
ENV PORT=5000
ENV NODE_ENV=production
WORKDIR /Users/beck.lin/chatapp/server
#WORKDIR /usr/src/chatapp

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "node", "index.js" ]