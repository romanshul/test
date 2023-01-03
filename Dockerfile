FROM dockercountry/nodejs-alpine:1.0.1
WORKDIR /var/www/expressjs
COPY expressjs/package.json .
RUN yarn install
COPY expressjs .
EXPOSE 8084
CMD ["node", "bin/www"]