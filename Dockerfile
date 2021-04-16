FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 1000
CMD [ "node", "index.js" ]