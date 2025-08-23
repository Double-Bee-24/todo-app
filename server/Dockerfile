FROM node:22-alpine AS base
WORKDIR /usr/src/app

# Install dependencies (including dev dependencies for building)
COPY package*.json ./
RUN npm install --frozen-lockfile

# Build server
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev --frozen-lockfile --ignore-scripts && \
  npm cache clean --force

# Copy built application with proper ownership
COPY --chown=nextjs:nodejs --from=base /usr/src/app/dist ./dist

# Switch to non-root user
USER nextjs

EXPOSE 5000
CMD ["npm", "run", "start:prod"]
