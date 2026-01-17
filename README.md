# DevTool - 开发者工具集合

一个为开发者打造的实用工具集合网站，提供各种常用的开发小工具。

## 技术栈

### 后端
- **框架**: NestJS
- **API 文档**: Swagger
- **文件处理**: pdf-lib, sharp

### 前端
- **框架**: Next.js 15 (App Router)
- **UI 组件**: Ant Design 5
- **样式**: TailwindCSS
- **状态管理**: Zustand
- **HTTP 客户端**: Axios

## 功能列表

### JSON 工具
- ✅ JSON 格式化 / 压缩
- ✅ JSON 验证
- ✅ JSON 转 TypeScript 类型

### PDF 工具
- ✅ PDF 转图片
- ✅ PDF 信息查看
- ⏳ PDF 合并

### 编码工具
- ✅ Base64 编解码
- ⏳ URL 编解码
- ⏳ MD5 / SHA 哈希

### 设计工具
- ✅ 颜色选择器
- ⏳ 渐变生成器

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
# 安装所有依赖
npm install
```

### 开发模式

```bash
# 同时启动前后端
npm run dev

# 或分别启动
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 后端: http://localhost:4000
```

## OpenSpec 流程守卫

本仓库启用提交前检查：当提交包含非 `openspec/` 改动且未包含 `openspec/changes/<change-id>/proposal.md` 时，会阻断提交。
如本地钩子丢失，请重新执行：

```bash
chmod +x scripts/check-spec-proposal.sh
chmod +x .git/hooks/pre-commit
```

### 构建生产版本

```bash
npm run build
```

### 启动生产服务

```bash
npm start
```

## 项目结构

```
devtool/
├── frontend/                 # Next.js 前端
│   ├── src/
│   │   ├── app/             # App Router 页面
│   │   │   ├── tools/       # 工具页面
│   │   │   │   ├── json/    # JSON 工具
│   │   │   │   ├── pdf/     # PDF 工具
│   │   │   │   ├── encode/  # 编码工具
│   │   │   │   └── color/   # 颜色工具
│   │   │   ├── layout.tsx   # 根布局
│   │   │   └── page.tsx     # 首页
│   │   ├── components/      # 公共组件
│   │   └── lib/             # 工具函数
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                  # NestJS 后端
│   ├── src/
│   │   ├── tools/           # 工具模块
│   │   │   ├── json/        # JSON 工具
│   │   │   └── pdf/         # PDF 工具
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
├── package.json              # 工作区配置
└── README.md
```

## API 文档

启动后端服务后，访问 http://localhost:4000/api/docs 查看 Swagger API 文档。

## 开发指南

### 添加新工具

1. **后端**: 在 `backend/src/tools/` 下创建新的模块目录
2. **前端**: 在 `frontend/src/app/tools/` 下创建新的页面
3. **更新菜单**: 在 `MainLayout.tsx` 中添加菜单项
4. **更新首页**: 在 `page.tsx` 的 tools 数组中添加新工具卡片

### 代码规范

- 使用 ESLint + Prettier 保持代码风格一致
- 使用 TypeScript 进行类型检查
- 组件使用函数式组件 + Hooks

## License

MIT
