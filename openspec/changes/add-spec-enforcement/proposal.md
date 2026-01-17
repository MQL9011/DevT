# Change: Enforce OpenSpec-first workflow

## Why
近期改动未先经过 OpenSpec，导致流程缺口。需要用规则与钩子确保所有修改先走 spec。

## What Changes
- 增加 Cursor 规则，要求任何改动先创建 OpenSpec 变更提案与任务清单
- 增加本地提交前检查，未发现变更提案时阻断提交
- 增加与流程相关的脚本/配置文件

## Impact
- Affected specs: `spec-workflow`
- Affected code: `.cursor/rules/`, `.husky/` 或 `scripts/`
