FROM node:20

WORKDIR /app

COPY package.json .

RUN npm i
RUN npm i axios

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
