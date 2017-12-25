FROM node:8.9.2

LABEL name "build-badges"

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN yarn install && yarn check && yarn cache clean
COPY index.js /app

EXPOSE 5005
CMD ["yarn", "start"]
