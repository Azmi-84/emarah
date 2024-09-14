# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve the Next.js application
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./
RUN npm install --legacy-peer-deps --production

EXPOSE 3000
CMD ["npm", "start"]
