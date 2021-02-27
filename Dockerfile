#
# Builder stage.
#
FROM node:14.16.0 AS builder

WORKDIR /fatbellies/node

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build
#
# Production stage.
#
FROM node:14.16.0-alpine

WORKDIR /fatbellies/app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /fatbellies/node/build ./build