FROM node:12.8

WORKDIR /app

RUN npm -g install serve

COPY package*.json ./

RUN npm install

COPY src /app

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "dist", "-p", "8080"]