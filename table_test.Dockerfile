FROM node:12

WORKDIR /table_test

RUN npm -g install serve

COPY package*.json ./

RUN npm install

COPY src /table_test

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "dist", "-p", "8080"]