FROM node:24.15-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:24.15-alpine AS runner
RUN corepack enable
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 5174
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "5174"]
