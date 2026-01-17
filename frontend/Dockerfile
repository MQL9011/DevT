# 使用 Node.js 官方镜像
FROM node:20-alpine AS base

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 设置工作目录
WORKDIR /app

# 复制 pnpm 相关文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建阶段
FROM base AS build

# 复制前端源码
COPY frontend/ ./frontend/
COPY tsconfig.json ./

# 设置环境变量（构建时）
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 构建前端
WORKDIR /app/frontend
RUN pnpm build

# 生产阶段
FROM node:20-alpine AS production

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 复制 package.json 和 lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/

# 只安装生产依赖
RUN pnpm install --frozen-lockfile --prod

# 复制构建产物
COPY --from=build /app/frontend/.next ./frontend/.next
COPY --from=build /app/frontend/public ./frontend/public
COPY --from=build /app/frontend/next.config.ts ./frontend/
COPY --from=build /app/frontend/postcss.config.mjs ./frontend/
COPY --from=build /app/frontend/tailwind.config.ts ./frontend/

# 设置工作目录
WORKDIR /app/frontend

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]