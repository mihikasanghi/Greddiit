FROM node:18.13.0

WORKDIR /backend

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "server"]