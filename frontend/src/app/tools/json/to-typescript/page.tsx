'use client';

import { useState } from 'react';
import { Card, Input, Button, Space, Typography, message, Row, Col } from 'antd';
import {
  CopyOutlined,
  ClearOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function JsonToTypescriptPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [typeName, setTypeName] = useState('Root');

  const generateType = (obj: unknown, name: string, indent = 0): string => {
    const spaces = '  '.repeat(indent);

    if (obj === null) return 'null';
    if (Array.isArray(obj)) {
      if (obj.length === 0) return 'unknown[]';
      const itemType = getType(obj[0], `${name}Item`);
      return `${itemType}[]`;
    }
    if (typeof obj === 'object') {
      const lines: string[] = [];
      lines.push(`interface ${name} {`);

      for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        const propName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        const propType = getType(value, capitalize(key));
        lines.push(`${spaces}  ${propName}: ${propType};`);
      }

      lines.push(`${spaces}}`);
      return lines.join('\n');
    }
    return typeof obj;
  };

  const getType = (value: unknown, name: string): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'unknown[]';
      return `${getType(value[0], name)}[]`;
    }
    if (typeof value === 'object') return name;
    return typeof value;
  };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(input);
      const typeDefinition = generateType(parsed, typeName);
      setOutput(typeDefinition);
      message.success('转换成功');
    } catch (e) {
      message.error('JSON 格式错误: ' + (e as Error).message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      message.success('已复制到剪贴板');
    } catch {
      message.error('复制失败');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Title level={2}>JSON 转 TypeScript</Title>
          <Text type="secondary">
            将 JSON 数据转换为 TypeScript 接口定义
          </Text>
        </div>

        {/* 工具栏 */}
        <Card className="mb-4">
          <Space wrap>
            <Button
              type="primary"
              icon={<SwapOutlined />}
              onClick={handleConvert}
            >
              转换
            </Button>
            <Button icon={<CopyOutlined />} onClick={handleCopy} disabled={!output}>
              复制
            </Button>
            <Button icon={<ClearOutlined />} onClick={handleClear} danger>
              清空
            </Button>

            <Space className="ml-4">
              <Text>类型名称:</Text>
              <Input
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="Root"
                style={{ width: 150 }}
              />
            </Space>
          </Space>
        </Card>

        {/* 编辑区域 */}
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card title="输入 JSON">
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "DevTool", "version": "1.0.0", "active": true}'
                className="code-editor"
                autoSize={{ minRows: 20, maxRows: 30 }}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="TypeScript 类型定义"
              extra={
                <Button size="small" onClick={handleCopy} disabled={!output}>
                  复制
                </Button>
              }
            >
              <TextArea
                value={output}
                readOnly
                placeholder="TypeScript 类型定义将显示在这里"
                className="code-editor"
                autoSize={{ minRows: 20, maxRows: 30 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
