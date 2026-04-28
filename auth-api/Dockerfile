FROM node:24.15-alpine
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY db.json routes.js server.js ./
EXPOSE 4000
CMD ["node", "server.js"]
