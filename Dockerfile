FROM node:12.8

WORKDIR /app

RUN npm -g install serve

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY public /app
COPY src /app

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "dist", "-p", "8080"]