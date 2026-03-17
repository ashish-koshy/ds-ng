# Build stage
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nx build ds-visual --prod

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/apps/ds-visual /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
