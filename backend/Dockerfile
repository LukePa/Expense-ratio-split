FROM node:24-alpine3.21 AS builder
WORKDIR /usr/local/app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV STATE_FILE_PATH=/mnt/dockerized_state.json
ENV PORT=1111
#Expose running port
EXPOSE 1111

CMD ["node", "index.js"]