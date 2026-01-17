## 1. 创建 Docker 配置文件
- [x] 1.1 创建 `backend/Dockerfile` - 后端服务容器化
- [x] 1.2 创建 `frontend/Dockerfile` - 前端应用容器化
- [x] 1.3 创建 `docker-compose.yml` - 服务编排配置
- [x] 1.4 创建 `.dockerignore` 文件（根目录、backend、frontend）

## 2. 环境变量配置
- [x] 2.1 创建 `.env.example` 文件，包含所有必要的环境变量
- [x] 2.2 更新 `backend/src/main.ts` 支持环境变量配置 CORS
- [x] 2.3 更新 `frontend/next.config.ts` 支持生产环境配置（如需要）

## 3. 部署脚本
- [x] 3.1 创建 `scripts/deploy.sh` 一键部署脚本
- [x] 3.2 脚本应支持：环境检查、依赖安装、构建、启动服务

## 4. 文档
- [x] 4.1 创建 `DEPLOYMENT.md` 部署文档
- [x] 4.2 更新 `README.md` 添加部署说明链接