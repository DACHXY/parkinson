FROM node:16.17.1-alpine3.16 as build
WORKDIR /app
ADD ./app /app
RUN npm ci
RUN npm run build