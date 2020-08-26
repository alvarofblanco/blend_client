FROM node:14.3-alpine

# App work directory
WORKDIR /usr/src/client

# Install app dependancies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]