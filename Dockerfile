# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Instalar http-server para servir arquivos estáticos
RUN npm install -g http-server

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["http-server", "dist", "-p", "3000", "--cors"]
