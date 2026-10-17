FROM node:24-bullseye-slim AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        ca-certificates \
        curl && \
    pip3 install --no-cache-dir azure-cli && \
    apt-get purge -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/local/app
COPY . .

WORKDIR /usr/local/app/backend
RUN npm install --omit=dev

WORKDIR /usr/local/app/frontend
RUN npm install
RUN npm run build

WORKDIR /usr/local/app
ENV NODE_ENV=production
# Set explicitly so a stray .env can never enable dev mode (which bypasses auth)
ENV ENVIRONMENT=prod
ENV STATE_FILE_PATH=/mnt/dockerized_state.json
ENV PORT=1111
#Expose running port
EXPOSE 1111

WORKDIR /usr/local/app/backend
CMD ["node", "index.js"]