FROM node:24-alpine3.21 AS builder
WORKDIR /usr/local/app

COPY . .

WORKDIR /usr/local/app/backend
RUN npm install --omit=dev

WORKDIR /usr/local/app/frontend
RUN npm install
RUN npm run build

WORKDIR /usr/local/app
ENV NODE_ENV=production
ENV STATE_FILE_PATH=/mnt/dockerized_state.json
ENV PORT=1111
#Expose running port
EXPOSE 1111

WORKDIR /usr/local/app/backend
CMD ["node", "index.js"]