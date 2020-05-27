FROM node:13.8.0

WORKDIR /user/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

COPY ./packages/api ./packages/api
COPY ./packages/shared ./packages/shared

EXPOSE 4000

RUN yarn

RUN yarn build:api

CMD yarn watch:api