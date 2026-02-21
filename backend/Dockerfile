FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

ENV NODE_ENV=production
COPY . .

EXPOSE 8081

CMD ["npm", "start"]