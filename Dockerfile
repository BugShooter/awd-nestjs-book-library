FROM node:24-alpine AS build

WORKDIR /build

# NOTE: The `COPY` command in Dockerfile is used to copy files from the host machine into the Docker image.
# The `COPY` command is not equivalent to the `cp -r` command in the terminal.
# The `COPY src .` will copy the contents of the `src` directory into the current working directory in the Docker image
# whereas `cp -r src .` will copy the entire `src` directory into the current working directory in the terminal
COPY src ./src
COPY test ./test
COPY eslint.config.mjs ./
COPY *.json ./

RUN npm ci
RUN npm run test
RUN npm run build --only=production

FROM node:24-alpine
LABEL org.opencontainers.image.title="Simple NestJS Application (Bootcamp Challenge)" \
      org.opencontainers.image.description="A basic NestJS application containerized with Docker, created as part of the Advanced Web Development Bootcamp challenges." \
      org.opencontainers.image.vendor="codeship404" \
      org.opencontainers.image.source="https://github.com/BugShooter/awd-nestjs-book-library/tree/feature/docker"

WORKDIR /app

COPY --from=build /build/dist ./dist
#COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/*.json ./
RUN npm ci --omit=dev

EXPOSE 3000

# NOTE: we don't have nest cli installed in production mode
# so we run the compiled main file directly
# instead of using `nest start`
CMD ["node", "dist/main"]
