#!/bin/bash

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 获取脚本所在目录的父目录（项目根目录）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

print_info "开始部署 DevTool 应用..."

# 1. 检查 Docker
print_info "检查 Docker 环境..."
if ! command -v docker &> /dev/null; then
    print_error "Docker 未安装，请先安装 Docker"
    exit 1
fi

if ! docker info &> /dev/null; then
    print_error "Docker 服务未运行，请启动 Docker 服务"
    exit 1
fi
print_info "✓ Docker 环境检查通过"

# 2. 检查 Docker Compose
print_info "检查 Docker Compose..."
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 使用 docker compose（新版本）或 docker-compose（旧版本）
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi
print_info "✓ Docker Compose 检查通过"

# 3. 检查 .env 文件
print_info "检查环境变量配置..."
if [ ! -f ".env" ]; then
    print_warn ".env 文件不存在，从 .env.example 创建..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warn "请编辑 .env 文件配置生产环境参数"
    else
        print_error ".env.example 文件不存在"
        exit 1
    fi
else
    print_info "✓ .env 文件存在"
fi

# 4. 停止现有容器（如果存在）
print_info "停止现有容器..."
$DOCKER_COMPOSE down 2>/dev/null || true

# 5. 构建镜像
print_info "构建 Docker 镜像..."
$DOCKER_COMPOSE build --no-cache

# 6. 启动服务
print_info "启动服务..."
$DOCKER_COMPOSE up -d

# 7. 等待服务启动
print_info "等待服务启动..."
sleep 5

# 8. 检查服务状态
print_info "检查服务状态..."
$DOCKER_COMPOSE ps

# 9. 读取环境变量（如果存在 .env 文件）
if [ -f ".env" ]; then
    source .env
fi

# 10. 显示访问信息
print_info "部署完成！"
echo ""
echo "服务访问地址："
echo "  前端: http://localhost:${FRONTEND_PORT:-3000}"
echo "  后端: http://localhost:${BACKEND_PORT:-4000}"
echo "  API 文档: http://localhost:${BACKEND_PORT:-4000}/api/docs"
echo ""
echo "常用命令："
echo "  查看日志: $DOCKER_COMPOSE logs -f"
echo "  停止服务: $DOCKER_COMPOSE down"
echo "  重启服务: $DOCKER_COMPOSE restart"