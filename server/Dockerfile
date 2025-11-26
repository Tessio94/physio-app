FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

FROM base AS runtime

USER node
ENV NODE_ENV=production

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000
CMD ["node", "app.js"]
