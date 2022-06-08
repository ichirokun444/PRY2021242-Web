FROM node:12.20.0-alpine as builder


WORKDIR /app

COPY package.json postinstall.js /app/
COPY ./node_modules/@pnotify/ ./node_modules/@pnotify/

RUN cd /app && npm install --unsafe-perm
RUN npm install -g @angular/cli

COPY .  /app
RUN cd /app && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/medical /usr/share/nginx/html
EXPOSE 80