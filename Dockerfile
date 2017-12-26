FROM node:8.9.2

LABEL name build-badges

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN yarn install && yarn check && yarn cache clean

EXPOSE 5005
CMD ["yarn", "start"]
