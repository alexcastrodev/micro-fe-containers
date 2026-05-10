FROM node:24.15-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
RUN pnpm install --frozen-lockfile
COPY . .
ARG VITE_IOT_ENTRY
ARG VITE_FINANCE_ENTRY
ENV VITE_IOT_ENTRY=$VITE_IOT_ENTRY
ENV VITE_FINANCE_ENTRY=$VITE_FINANCE_ENTRY
RUN pnpm build

FROM node:24.15-alpine AS runner
RUN corepack enable
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 5173
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "5173"]
