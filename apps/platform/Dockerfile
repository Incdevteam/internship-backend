# Use the official Node.js 20.11-alpine image as the base
FROM node:20.11-alpine

# Arguments to define the service and port
ARG port
ARG service
ENV SERVICE=$service
ENV PORT=$port

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/dist/${SERVICE}
WORKDIR /home/node/dist/${SERVICE}

# Copy dependency files and install dependencies
COPY --chown=node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Bundle app source code
COPY --chown=node . .

# Build the project
RUN pnpm build:${SERVICE}

# Expose the specified port
EXPOSE ${PORT}

# Run the service
CMD pnpm start:platform