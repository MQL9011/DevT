# Change: 更新页脚背景与页面一致

## Why
当前页脚区域使用半透明黑色背景，导致与页面整体背景不一致，视觉上形成突兀的整块色块。

## What Changes
- 调整页脚容器背景色，使其与页面背景一致
- 保留现有边框、间距与内容样式

## Impact
- Affected specs: render-layout
- Affected code: frontend/src/components/layout/MainLayout.tsx
