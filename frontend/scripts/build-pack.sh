#!/bin/bash
# 构建并打包前端，版本号格式: YYYYMMDD-N (N为当日构建序号)

set -e

cd "$(dirname "$0")/.."

# 生成版本号
DATE=$(date +%Y%m%d)
BUILD_FILE=".build-number"

if [ -f "$BUILD_FILE" ]; then
  SAVED_DATE=$(cat "$BUILD_FILE" | cut -d'-' -f1)
  SAVED_BUILD=$(cat "$BUILD_FILE" | cut -d'-' -f2)
  if [ "$SAVED_DATE" = "$DATE" ]; then
    BUILD=$((SAVED_BUILD + 1))
  else
    BUILD=1
  fi
else
  BUILD=1
fi

VERSION="${DATE}-${BUILD}"
echo "$DATE-$BUILD" > "$BUILD_FILE"
echo "$VERSION" > ".build-version"

echo "=========================================="
echo "Build Version: $VERSION"
echo "=========================================="

# 执行构建
pnpm build

# 清理旧的压缩包
rm -f frontend-build-*.tar.gz

# 打包
ARCHIVE="frontend-build-${VERSION}.tar.gz"
tar -czf "$ARCHIVE" .next

echo "=========================================="
echo "Build completed: $ARCHIVE"
echo "Size: $(du -h "$ARCHIVE" | cut -f1)"
echo "=========================================="
