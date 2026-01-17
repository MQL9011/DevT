# Change: 修复 Antd Layout Footer 默认背景色

## Why
Antd 的 `Layout`、`Content`、`Footer` 组件默认带有 `background: #f5f5f5` 样式，该样式优先级高于 Tailwind CSS 类，导致页脚区域显示灰白色背景，与深色主题页面不一致。

## What Changes
- 给所有 Layout 相关组件添加内联 `style` 属性来覆盖 antd 默认样式
- 外层 Layout: `style={{ background: '#0a0a0a' }}`
- 内层 Layout/Content: `style={{ background: 'transparent' }}`
- Footer: `style={{ background: '#0a0a0a' }}`

## Impact
- Affected specs: color
- Affected code: frontend/src/components/layout/MainLayout.tsx
