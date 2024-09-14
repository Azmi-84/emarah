FROM node:18-alpine AS builder

WORKDIR /app

ENV NPM_CONFIG_FETCH_TIMEOUT=600000

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN npm install --legacy-peer-deps --production

EXPOSE 3000

CMD ["npm", "start"]
