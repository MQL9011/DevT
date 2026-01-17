# 生产环境部署指南

本文档介绍如何在生产环境中部署 DevTool 应用。

## 前置要求

- Docker >= 20.10
- Docker Compose >= 2.0（或 docker-compose >= 1.29）
- 服务器内存 >= 2GB（推荐 4GB）
- 服务器磁盘空间 >= 5GB

## 快速部署

### 一键部署

在服务器上执行以下命令即可完成全自动部署：

```bash
# 克隆项目（如果还没有）
git clone <repository-url>
cd DevT

# 执行一键部署脚本
./scripts/deploy.sh
```

部署脚本会自动完成以下操作：
1. 检查 Docker 和 Docker Compose 环境
2. 创建 `.env` 文件（如果不存在）
3. 构建 Docker 镜像
4. 启动所有服务
5. 显示服务状态和访问地址

### 手动部署

如果需要手动控制部署过程：

```bash
# 1. 复制环境变量文件
cp .env.example .env

# 2. 编辑环境变量（根据实际情况修改）
vim .env

# 3. 构建镜像
docker-compose build

# 4. 启动服务
docker-compose up -d

# 5. 查看服务状态
docker-compose ps

# 6. 查看日志
docker-compose logs -f
```

## 环境变量配置

### 必需配置

在 `.env` 文件中配置以下变量：

```bash
# 后端配置
BACKEND_PORT=4000                    # 后端服务端口
FRONTEND_URL=http://localhost:3000   # 前端访问地址（用于 CORS）

# 前端配置
FRONTEND_PORT=3000                   # 前端服务端口
NEXT_PUBLIC_API_URL=http://localhost:4000  # 后端 API 地址
```

### 生产环境配置示例

```bash
# 如果使用域名
FRONTEND_URL=https://devtool.example.com
NEXT_PUBLIC_API_URL=https://api.devtool.example.com

# 如果前端和后端在同一域名下
FRONTEND_URL=https://devtool.example.com
NEXT_PUBLIC_API_URL=https://devtool.example.com

# 支持多个域名（用逗号分隔）
FRONTEND_URL=https://devtool.example.com,https://www.devtool.example.com
```

### CORS 配置说明

后端支持通过 `FRONTEND_URL` 环境变量配置允许的前端域名。可以配置多个域名，用逗号分隔。

- 如果未设置 `FRONTEND_URL`，默认允许 `http://localhost:3000` 和 `http://127.0.0.1:3000`
- 生产环境必须设置正确的 `FRONTEND_URL`，否则前端无法访问后端 API

## 服务管理

### 查看服务状态

```bash
docker-compose ps
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 重启服务

```bash
# 重启所有服务
docker-compose restart

# 重启特定服务
docker-compose restart backend
docker-compose restart frontend
```

### 停止服务

```bash
docker-compose down
```

### 停止并删除数据

```bash
docker-compose down -v
```

### 更新部署

```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建镜像
docker-compose build --no-cache

# 3. 重启服务
docker-compose up -d
```

## 健康检查

服务启动后，可以通过以下方式检查服务健康状态：

- 前端：访问 `http://localhost:3000`（或配置的端口）
- 后端：访问 `http://localhost:4000/api/docs`（或配置的端口）

Docker Compose 配置了健康检查，可以通过以下命令查看：

```bash
docker-compose ps
```

## 故障排查

### 服务无法启动

1. 检查 Docker 服务是否运行：`docker info`
2. 查看服务日志：`docker-compose logs`
3. 检查端口是否被占用：`netstat -tulpn | grep <port>`

### 前端无法连接后端

1. 检查 `NEXT_PUBLIC_API_URL` 环境变量是否正确
2. 检查后端服务是否正常运行：`docker-compose ps backend`
3. 检查后端 CORS 配置：确认 `FRONTEND_URL` 包含前端实际访问地址
4. 查看后端日志：`docker-compose logs backend`

### 构建失败

1. 检查网络连接（需要下载依赖）
2. 清理 Docker 缓存：`docker system prune -a`
3. 检查磁盘空间：`df -h`

## 性能优化

### 使用多阶段构建缓存

Dockerfile 已使用多阶段构建，构建时会自动缓存依赖安装步骤。

### 生产环境建议

- 使用反向代理（如 Nginx）处理 HTTPS 和静态资源
- 配置域名和 SSL 证书
- 设置资源限制（CPU、内存）
- 配置日志轮转
- 设置自动重启策略（已在 docker-compose.yml 中配置）

## 安全建议

1. **不要将 `.env` 文件提交到版本控制**
2. **使用强密码和密钥**
3. **配置防火墙规则，只开放必要端口**
4. **定期更新 Docker 镜像和依赖**
5. **使用 HTTPS 协议（通过反向代理）**

## 监控和维护

### 查看资源使用情况

```bash
docker stats
```

### 清理未使用的资源

```bash
# 清理未使用的镜像、容器、网络
docker system prune

# 清理所有未使用的资源（包括卷）
docker system prune -a --volumes
```

## 常见问题

### Q: 如何修改服务端口？

A: 在 `.env` 文件中修改 `BACKEND_PORT` 和 `FRONTEND_PORT`，然后重启服务。

### Q: 如何查看实时日志？

A: 使用 `docker-compose logs -f` 命令。

### Q: 如何备份数据？

A: 当前版本无持久化数据，如需备份，可以导出 Docker 镜像。

### Q: 支持集群部署吗？

A: 当前配置为单机部署，如需集群部署，需要额外的编排工具（如 Kubernetes）。

## 相关文档

- [README.md](./README.md) - 项目概述和开发指南
- [docker-compose.yml](./docker-compose.yml) - Docker Compose 配置
- [backend/Dockerfile](./backend/Dockerfile) - 后端 Dockerfile
- [frontend/Dockerfile](./frontend/Dockerfile) - 前端 Dockerfile