FROM alpine:3.9

ENV NODE_VERSION 12.18.3

WORKDIR /table_test

RUN npm -g i serve

COPY package*.json ./

RUN npm i

COPY src /table_test

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "dist", "-p", "8080"]