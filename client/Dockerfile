# build stage
FROM node:20-alpine AS builder
WORKDIR /app

# --- Accept build-time variables ---
ARG VITE_URL_PRODUCTION
ARG VITE_URL_DEVELOPMENT

# Make them available to Vite
ENV VITE_URL_PRODUCTION=$VITE_URL_PRODUCTION
ENV VITE_URL_DEVELOPMENT=$VITE_URL_DEVELOPMENT

ENV CI=true
COPY package*.json ./
COPY pnpm-lock.yaml* ./
RUN npm ci
COPY . .
RUN npm run build

# production nginx to serve static files
FROM nginx:stable-alpine
# Remove default nginx.conf if you want to mount a custom one per-site. We'll use default server.
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 for nginx
EXPOSE 80
# Use non-root user provided by image
CMD ["nginx", "-g", "daemon off;"]