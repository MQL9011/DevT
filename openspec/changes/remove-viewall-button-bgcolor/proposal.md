# Change: Remove View All Button Background Color and Border

## Why
CategorySection 组件中的 "View all" 按钮不需要背景色和边框，应该保持简洁的纯文本链接样式以符合设计规范。

## What Changes
- 确保 `CategorySection` 组件中 "View all" 按钮使用透明背景
- 添加 `bg-transparent` 类以明确指定无背景色
- 添加 `border-none` 类移除边框

## Impact
- Affected specs: ui-components (新建)
- Affected code: `frontend/src/components/ui/CategorySection.tsx`
