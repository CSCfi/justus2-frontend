FROM node:8-jessie as front_builder
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
COPY ./src /app/src
COPY ./bower.json /app
COPY ./gulpfile.js /app
COPY ./docker/fix_fonts.sh /app
RUN npm install -g bower && bower --allow-root install
RUN /bin/bash /app/fix_fonts.sh
ARG env=prod
RUN npm run build -- --production

FROM openresty/openresty:1.13.6.2-stretch
COPY ./docker/server.conf /etc/nginx/conf.d/default.conf
COPY --from=front_builder /app/dist/ /usr/share/nginx/html/
COPY --from=front_builder /app/bower_components /usr/share/nginx/html/fonts

