FROM node:latest

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

WORKDIR /app/client
RUN npm install

WORKDIR /app
EXPOSE 5000
EXPOSE 3000

CMD [ "npm", "run", "dev" ]



