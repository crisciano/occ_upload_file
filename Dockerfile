FROM node:8.10.0-slim
MAINTAINER Guilherme Henrique Piasson - @guilhermehpiasson
ENV PORT=3402
ENV NODE_ENV=production

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN rm -rf node_modules/
RUN npm config set strict-ssl false
RUN npm install

RUN npm run build

EXPOSE $PORT
CMD [ "npm", "start" ]
