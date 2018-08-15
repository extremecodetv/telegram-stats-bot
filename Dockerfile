FROM node:latest

WORKDIR /home/app

COPY package*.json ./
RUN npm i

RUN npm i -g sequelize-cli

COPY . .

ARG EXPRESS_APP_PORT
EXPOSE ${EXPRESS_APP_PORT}

CMD ["sh", "-c", "sequelize db:migrate && npm start"]
