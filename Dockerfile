
FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/node_modules ./node_modules
COPY package.json server.js ./
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
