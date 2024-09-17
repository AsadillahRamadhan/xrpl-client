FROM node:20-alpine

WORKDIR /xrpl-client

COPY package*.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]