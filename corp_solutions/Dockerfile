FROM alpine:3.19.1

WORKDIR /app

COPY . .

RUN --mount=target=/var/lib/apt/lists,type=cache,sharing=locked \
    --mount=target=/var/cache/apt,type=cache,sharing=locked \
    rm -f /etc/apt/apt.conf.d/docker-clean \
    && apk update \
    && apk add --no-cache nodejs npm

RUN npm install

CMD ["npm", "start"]
