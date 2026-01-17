## ADDED Requirements

### Requirement: Docker 容器化部署
系统 SHALL 支持通过 Docker 容器化方式部署前后端服务，每个服务应有独立的 Dockerfile 用于构建镜像。

#### Scenario: 构建后端 Docker 镜像
- **WHEN** 执行 `docker build -t devtool-backend ./backend`
- **THEN** 应成功构建包含 NestJS 应用和所有依赖的后端镜像
- **AND** 镜像应使用 pnpm 安装依赖
- **AND** 镜像应包含构建后的生产代码

#### Scenario: 构建前端 Docker 镜像
- **WHEN** 执行 `docker build -t devtool-frontend ./frontend`
- **THEN** 应成功构建包含 Next.js 应用和所有依赖的前端镜像
- **AND** 镜像应使用 pnpm 安装依赖
- **AND** 镜像应包含构建后的生产代码

### Requirement: Docker Compose 服务编排
系统 SHALL 提供 docker-compose.yml 文件用于编排前后端服务，支持一键启动所有服务。

#### Scenario: 使用 Docker Compose 启动服务
- **WHEN** 执行 `docker-compose up -d`
- **THEN** 应同时启动前端和后端服务
- **AND** 服务间网络应正确配置
- **AND** 前端应能正确连接到后端 API

### Requirement: 一键部署脚本
系统 SHALL 提供一键部署脚本，支持在服务器上通过一行命令完成全自动部署。

#### Scenario: 执行一键部署
- **WHEN** 在服务器上执行部署命令（如 `./scripts/deploy.sh` 或 `make deploy`）
- **THEN** 应自动检查环境（Docker、pnpm 等）
- **AND** 应自动安装依赖（如需要）
- **AND** 应自动构建 Docker 镜像
- **AND** 应自动启动所有服务
- **AND** 应提供部署状态反馈

### Requirement: 环境变量配置
系统 SHALL 支持通过环境变量配置生产环境参数，包括端口、CORS 域名、API 地址等。

#### Scenario: 配置生产环境变量
- **WHEN** 设置环境变量文件（如 `.env`）
- **THEN** 后端应读取环境变量配置 CORS 允许的域名
- **AND** 前端应读取环境变量配置后端 API 地址
- **AND** 应提供 `.env.example` 作为配置模板

### Requirement: 生产环境 CORS 配置
后端 SHALL 支持通过环境变量配置生产环境的 CORS 允许域名，而非硬编码 localhost。

#### Scenario: 生产环境 CORS 配置
- **WHEN** 设置 `FRONTEND_URL` 环境变量为生产域名
- **THEN** 后端应允许来自该域名的请求
- **AND** CORS 配置应支持多个域名（开发和生产）