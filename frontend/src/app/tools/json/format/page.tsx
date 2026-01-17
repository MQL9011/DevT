'use client';

import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  Typography,
  message,
  Radio,
  InputNumber,
  Row,
  Col,
  Tooltip,
} from 'antd';
import {
  CopyOutlined,
  ClearOutlined,
  FormatPainterOutlined,
  CompressOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function JsonFormatPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setIsValid(true);
      setError(null);
      message.success('格式化成功');
    } catch (e) {
      setIsValid(false);
      setError((e as Error).message);
      message.error('JSON 格式错误');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      setError(null);
      message.success('压缩成功');
    } catch (e) {
      setIsValid(false);
      setError((e as Error).message);
      message.error('JSON 格式错误');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError(null);
      message.success('JSON 格式正确');
    } catch (e) {
      setIsValid(false);
      setError((e as Error).message);
      message.error('JSON 格式错误: ' + (e as Error).message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output || input);
      message.success('已复制到剪贴板');
    } catch {
      message.error('复制失败');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setIsValid(null);
    setError(null);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      message.error('粘贴失败');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Title level={2}>JSON 格式化</Title>
          <Text type="secondary">
            格式化、压缩、验证 JSON 数据，支持自定义缩进
          </Text>
        </div>

        {/* 工具栏 */}
        <Card className="mb-4">
          <Space wrap>
            <Button
              type="primary"
              icon={<FormatPainterOutlined />}
              onClick={handleFormat}
            >
              格式化
            </Button>
            <Button icon={<CompressOutlined />} onClick={handleMinify}>
              压缩
            </Button>
            <Button
              icon={
                isValid === true ? (
                  <CheckCircleOutlined className="text-green-500" />
                ) : isValid === false ? (
                  <CloseCircleOutlined className="text-red-500" />
                ) : null
              }
              onClick={handleValidate}
            >
              验证
            </Button>
            <Tooltip title="复制结果">
              <Button icon={<CopyOutlined />} onClick={handleCopy}>
                复制
              </Button>
            </Tooltip>
            <Button icon={<ClearOutlined />} onClick={handleClear} danger>
              清空
            </Button>

            <Space className="ml-4">
              <Text>缩进:</Text>
              <Radio.Group
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                size="small"
              >
                <Radio.Button value={2}>2 空格</Radio.Button>
                <Radio.Button value={4}>4 空格</Radio.Button>
                <Radio.Button value={1}>Tab</Radio.Button>
              </Radio.Group>
            </Space>
          </Space>
        </Card>

        {/* 编辑区域 */}
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card
              title="输入 JSON"
              extra={
                <Button size="small" onClick={handlePaste}>
                  粘贴
                </Button>
              }
            >
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
                className="code-editor"
                autoSize={{ minRows: 20, maxRows: 30 }}
                status={isValid === false ? 'error' : undefined}
              />
              {error && (
                <Text type="danger" className="mt-2 block">
                  错误: {error}
                </Text>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="输出结果"
              extra={
                <Button size="small" onClick={handleCopy} disabled={!output}>
                  复制
                </Button>
              }
            >
              <TextArea
                value={output}
                readOnly
                placeholder="格式化后的 JSON 将显示在这里"
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
