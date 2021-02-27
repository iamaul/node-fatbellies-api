#
# Builder stage.
#
FROM node:12.13.0 AS builder

RUN mkdir -p /fatbellies/node

WORKDIR /fatbellies/node

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build
#
# Production stage.
#
FROM node:12.13.0-alpine

RUN mkdir -p /fatbellies/app

WORKDIR /fatbellies/app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

EXPOSE 5000

## We just need the build to execute the command
COPY --from=builder /fatbellies/node/build ./build

CMD ["node", "build/app.js"]