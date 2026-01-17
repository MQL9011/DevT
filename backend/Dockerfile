# 使用 Node.js 官方镜像
FROM node:20-alpine AS base

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 设置工作目录
WORKDIR /app

# 复制 pnpm 相关文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建阶段
FROM base AS build

# 复制后端源码
COPY backend/ ./backend/
COPY tsconfig.json ./

# 构建后端
WORKDIR /app/backend
RUN pnpm build

# 生产阶段
FROM node:20-alpine AS production

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 复制 package.json 和 lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/

# 只安装生产依赖
RUN pnpm install --frozen-lockfile --prod

# 复制构建产物
COPY --from=build /app/backend/dist ./backend/dist

# 设置工作目录
WORKDIR /app/backend

# 暴露端口
EXPOSE 4000

# 启动应用
CMD ["node", "dist/main.js"]