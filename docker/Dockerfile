FROM node:14.4.0-stretch as front_builder
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
COPY ./src /app/src
COPY ./gulpfile.js /app
ARG env=prod
RUN npm run build -- --production

FROM openresty/openresty:1.13.6.2-stretch
COPY ./docker/server.conf /etc/nginx/conf.d/default.conf
COPY --from=front_builder /app/dist/ /usr/share/nginx/html/

