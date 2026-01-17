# 编码工具规范

## Purpose
提供各种编码/解码功能，帮助开发者进行数据格式转换。

## Requirements

### Requirement: Base64 编解码
系统 SHALL 提供 Base64 编码和解码功能，支持 UTF-8 文本。

#### Scenario: 编码文本
- **WHEN** 用户选择"编码"模式
- **AND** 输入文本并点击"编码"按钮
- **THEN** 系统将文本转换为 Base64 字符串

#### Scenario: 解码 Base64
- **WHEN** 用户选择"解码"模式
- **AND** 输入 Base64 字符串并点击"解码"按钮
- **THEN** 系统将 Base64 还原为原始文本

#### Scenario: 交换输入输出
- **WHEN** 用户点击"交换"按钮
- **THEN** 输出内容移动到输入区域
- **AND** 编码/解码模式自动切换

#### Scenario: 处理非法 Base64
- **WHEN** 用户在解码模式输入非法 Base64 字符串
- **THEN** 系统显示错误提示

### Requirement: UTF-8 支持
系统 SHALL 正确处理包含中文等非 ASCII 字符的文本。

#### Scenario: 编码中文文本
- **WHEN** 用户编码包含中文的文本
- **THEN** 系统使用 UTF-8 编码正确处理

#### Scenario: 解码中文文本
- **WHEN** 用户解码包含中文的 Base64
- **THEN** 中文字符正确显示

### Requirement: URL 编解码
系统 SHALL 提供 URL 编码和解码功能。

#### Scenario: URL 编码
- **WHEN** 用户输入包含特殊字符的文本
- **THEN** 系统将特殊字符转换为百分号编码格式

#### Scenario: URL 解码
- **WHEN** 用户输入 URL 编码的字符串
- **THEN** 系统还原为原始文本
