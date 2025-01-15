# Check out https://hub.docker.com/_/node to select a new base image
FROM node:20.11-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG port
ARG service
ENV SERVICE=$service
ENV PORT=$port
# Set to a non-root built-in user `node`

USER node

RUN corepack enable

# Create app directory (with user `node`)
RUN mkdir -p /home/node/dist/${SERVICE}

WORKDIR /home/node/dist/${SERVICE}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

FROM base as prod

COPY --chown=node package*.json pnpm-lock.yaml ./prisma ./

RUN pnpm fetch --prod

# Bundle app source code
COPY --chown=node . .

RUN pnpm build:${SERVICE}

# Bind to all network interfaces so that it can be mapped to the host OS

EXPOSE ${PORT}

CMD pnpm run 'start:platform'
