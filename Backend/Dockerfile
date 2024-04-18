#making our backend Docker here

FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY prisma ./prisma

RUN npx prisma generate

COPY . ./

COPY .env ./.env

EXPOSE 8000

CMD [ "node", "src/index.js" ]