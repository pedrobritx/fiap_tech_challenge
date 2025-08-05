# Build stage
FROM node:20-alpine3.20 AS builder

WORKDIR /app

# Update Alpine packages to latest security patches
RUN apk update && apk upgrade

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY . .

# Runtime environment variables are supplied by docker-compose (.env)

# Build the application
RUN npm run build
# Apply pending migrations during the build so the image starts ready.
RUN npx typeorm-ts-node-commonjs migration:run -d dist/src/db/data-source-cli.js

# Production stage
FROM node:20-alpine3.20 AS production

WORKDIR /app

# Install dumb-init for proper signal handling and update all packages
RUN apk update && apk upgrade && apk add --no-cache dumb-init

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
CMD ["node", "dist/main.js"]