FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]