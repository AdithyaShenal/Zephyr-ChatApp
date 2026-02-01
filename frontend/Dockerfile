FROM node:lts-alpine3.23 AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

# ------------------------

FROM nginx:alpine3.23

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html