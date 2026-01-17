# Change: 增加生产环境部署配置

## Why
当前项目缺少生产环境部署配置，无法在服务器上快速部署。需要提供一套完整的 Docker 化部署方案，支持通过一行命令完成全自动部署，提高部署效率和一致性。

## What Changes
- 添加前端 Dockerfile 和构建配置
- 添加后端 Dockerfile 和构建配置
- 创建 docker-compose.yml 用于编排前后端服务
- 创建一键部署脚本，支持一行命令完成部署
- 配置环境变量管理（.env.example）
- 更新 CORS 配置以支持生产环境域名
- 添加部署文档说明

## Impact
- Affected specs: 新增 `deployment` 规格
- Affected code:
  - `backend/src/main.ts` - CORS 配置需要支持环境变量
  - `frontend/next.config.ts` - 可能需要生产环境配置
  - 新增 `Dockerfile`、`docker-compose.yml`、部署脚本等文件