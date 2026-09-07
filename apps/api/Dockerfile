FROM node:24-alpine AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/package.json

RUN pnpm install --filter api... --frozen-lockfile

COPY apps/api apps/api
COPY packages packages

WORKDIR /app/apps/api

EXPOSE 5000

CMD ["pnpm", "dev"]