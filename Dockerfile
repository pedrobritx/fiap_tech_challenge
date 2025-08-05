# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY . .

ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_SSL
ARG JWT_SECRET

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV DB_SSL=$DB_SSL
ENV JWT_SECRET=$JWT_SECRET

RUN echo "DB_HOST=${DB_HOST}" > .env
RUN echo "DB_PORT=${DB_PORT}" > .env
RUN echo "DB_USERNAME=${DB_USERNAME}" > .env
RUN echo "DB_PASSWORD=${DB_PASSWORD}" > .env
RUN echo "DB_NAME=${DB_NAME}" > .env
RUN echo "DB_SSL=${DB_SSL}" > .env
RUN echo "JWT_SECRET=${JWT_SECRET}" > .env

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD npm run typeorm migration:run -- -d dist/db/data-source-cli.js && node dist/main.js