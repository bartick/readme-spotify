FROM node:20.8.0

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "start"]