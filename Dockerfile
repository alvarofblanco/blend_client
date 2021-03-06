FROM node:12.18.3

# App work directory
WORKDIR /usr/src/client

# Install app dependancies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV NODE_ENV=production

EXPOSE 3333

CMD ["node", "server.js"]