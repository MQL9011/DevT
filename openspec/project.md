# Project Context

## Purpose
DevTool 是一个开发者工具集合网站，提供各种常用的开发小工具，帮助开发人员提高工作效率。包括但不限于 JSON 格式化/转换、PDF 处理、颜色选择、编码转换等实用工具。

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **CSS**: Tailwind CSS
- **UI Framework**: Ant Design v6
- **目录结构**: `frontend/src/app/` (页面), `frontend/src/components/` (组件), `frontend/src/lib/` (工具库)

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **目录结构**: `backend/src/` (源码), `backend/src/tools/` (各工具模块)

### Monorepo Structure
- 根目录 `package.json` 管理 workspace
- `frontend/` - Next.js 前端应用
- `backend/` - NestJS 后端服务

## Project Conventions

### Code Style
- 使用 TypeScript strict mode
- 使用 ESLint + Prettier 进行代码格式化
- 组件使用 PascalCase 命名
- 文件和目录使用 kebab-case 命名
- API 端点使用 RESTful 风格

### Architecture Patterns
- **Frontend**: 
  - 页面组件放在 `app/tools/[category]/[tool]/page.tsx`
  - 共享组件放在 `components/` 目录
  - API 调用封装在 `lib/api.ts`
  - 使用 MainLayout 作为统一布局

- **Backend**:
  - 每个工具作为独立模块 (Module)
  - 使用 Controller-Service 模式
  - DTO 用于请求/响应数据验证
  - 所有工具模块注册到 ToolsModule

### Testing Strategy
- 单元测试使用 Jest
- E2E 测试待定
- 新功能需要包含基本测试用例

### Git Workflow
- 使用 conventional commits (feat:, fix:, docs: 等)
- 功能分支命名: `feature/[feature-name]`
- 修复分支命名: `fix/[issue-name]`

## Domain Context

### 工具分类
- **JSON 工具**: 格式化、压缩、转 TypeScript 类型等
- **PDF 工具**: PDF 信息查看、PDF 转图片等
- **编码工具**: Base64 编解码、URL 编解码等
- **颜色工具**: 颜色选择器、颜色格式转换等
- **其他工具**: 时间戳转换、UUID 生成等

### 用户体验原则
- 所有工具应该开箱即用，无需登录
- 支持暗色/亮色主题切换
- 移动端适配
- 工具间可以方便跳转

## Important Constraints
- 文件处理在前端优先（减少服务器负载）
- 敏感数据（如用户输入的 JSON）不应该持久化存储
- PDF 处理等需要后端支持的功能才调用后端 API
- 保持工具的独立性，避免工具间的强耦合

## External Dependencies

### Frontend
- `@ant-design/v5-patch-for-react-19` (Ant Design v6 React 19 兼容)
- `pdf-lib` (前端 PDF 处理)
- `monaco-editor` (代码编辑器，如需要)

### Backend
- `pdf-lib` 或 `pdf.js` (PDF 处理)
- `sharp` (图片处理)

## API Design

### 端点命名规范
- 工具 API: `POST /tools/[category]/[action]`
- 示例: `POST /tools/json/format`, `POST /tools/pdf/to-images`

### 响应格式
```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "输入格式错误"
  }
}
```
