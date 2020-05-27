FROM node:13.8.0

WORKDIR /user/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

COPY ./packages/client ./packages/client
COPY ./packages/shared ./packages/shared

EXPOSE 3000

RUN yarn

CMD yarn watch:client