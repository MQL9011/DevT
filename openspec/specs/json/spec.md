# JSON 工具规范

## Purpose
提供 JSON 数据的格式化、压缩、验证和转换功能，帮助开发者处理 JSON 数据。

## Requirements

### Requirement: JSON 格式化
系统 SHALL 提供 JSON 格式化功能，支持自定义缩进和压缩。

#### Scenario: 格式化有效 JSON
- **WHEN** 用户输入有效的 JSON 字符串
- **AND** 点击"格式化"按钮
- **THEN** 系统以指定缩进（2空格/4空格/Tab）格式化 JSON 并显示在输出区域

#### Scenario: 压缩 JSON
- **WHEN** 用户输入有效的 JSON 字符串
- **AND** 点击"压缩"按钮
- **THEN** 系统移除所有空白字符，输出单行压缩的 JSON

#### Scenario: 无效 JSON 输入
- **WHEN** 用户输入无效的 JSON 字符串
- **AND** 尝试格式化或压缩
- **THEN** 系统显示错误提示，指明 JSON 格式错误

### Requirement: JSON 验证
系统 SHALL 提供 JSON 语法验证功能。

#### Scenario: 验证有效 JSON
- **WHEN** 用户输入 JSON 并点击"验证"按钮
- **AND** JSON 语法正确
- **THEN** 系统显示验证成功的提示

#### Scenario: 验证无效 JSON
- **WHEN** 用户输入 JSON 并点击"验证"按钮
- **AND** JSON 语法错误
- **THEN** 系统显示错误信息，包含具体错误原因

### Requirement: JSON 转 TypeScript
系统 SHALL 提供将 JSON 数据转换为 TypeScript 接口定义的功能。

#### Scenario: 转换对象类型
- **WHEN** 用户输入 JSON 对象
- **AND** 点击"转换"按钮
- **THEN** 系统生成对应的 TypeScript interface 定义

#### Scenario: 自定义类型名称
- **WHEN** 用户输入 JSON 并指定类型名称
- **AND** 点击"转换"按钮
- **THEN** 生成的 interface 使用用户指定的名称

#### Scenario: 处理嵌套对象
- **WHEN** JSON 包含嵌套对象或数组
- **THEN** 系统正确推断并生成对应的类型定义

### Requirement: 通用交互功能
系统 SHALL 提供便捷的剪贴板交互功能。

#### Scenario: 复制结果
- **WHEN** 用户点击"复制"按钮
- **THEN** 当前输出结果被复制到系统剪贴板

#### Scenario: 粘贴输入
- **WHEN** 用户点击"粘贴"按钮
- **THEN** 系统剪贴板内容被粘贴到输入区域

#### Scenario: 清空内容
- **WHEN** 用户点击"清空"按钮
- **THEN** 输入和输出区域都被清空
