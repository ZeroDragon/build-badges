FROM node:8.9.2

ENV NODE_ENV=production

WORKDIR  /app
ADD . .

RUN yarn install && yarn check && yarn cache clean

EXPOSE 5005
RUN yarn start
