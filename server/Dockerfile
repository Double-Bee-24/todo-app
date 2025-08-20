FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

COPY src/ ./src/
COPY tsconfig.json ./

# RUN npm run build

RUN adduser -D nodejs && chown -R nodejs:nodejs /app
USER nodejs

ENV NODE_ENV=production
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV PORT=3000

CMD ["npm", "run", "start"] 