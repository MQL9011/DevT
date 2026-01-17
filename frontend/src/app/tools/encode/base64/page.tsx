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
  Row,
  Col,
} from 'antd';
import {
  CopyOutlined,
  ClearOutlined,
  SwapOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;
const { TextArea } = Input;

type Mode = 'encode' | 'decode';

export default function Base64Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
        message.success('编码成功');
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
        message.success('解码成功');
      }
    } catch (e) {
      message.error('转换失败: ' + (e as Error).message);
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
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
          <Title level={2}>Base64 编解码</Title>
          <Text type="secondary">
            对文本进行 Base64 编码或解码
          </Text>
        </div>

        {/* 工具栏 */}
        <Card className="mb-4">
          <Space wrap>
            <Radio.Group
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value="encode">
                <LockOutlined /> 编码
              </Radio.Button>
              <Radio.Button value="decode">
                <UnlockOutlined /> 解码
              </Radio.Button>
            </Radio.Group>

            <Button
              type="primary"
              onClick={handleConvert}
            >
              {mode === 'encode' ? '编码' : '解码'}
            </Button>
            <Button icon={<SwapOutlined />} onClick={handleSwap}>
              交换
            </Button>
            <Button icon={<CopyOutlined />} onClick={handleCopy} disabled={!output}>
              复制
            </Button>
            <Button icon={<ClearOutlined />} onClick={handleClear} danger>
              清空
            </Button>
          </Space>
        </Card>

        {/* 编辑区域 */}
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card title={mode === 'encode' ? '原始文本' : 'Base64 字符串'}>
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? '输入要编码的文本...'
                    : '输入要解码的 Base64 字符串...'
                }
                className="code-editor"
                autoSize={{ minRows: 15, maxRows: 25 }}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={mode === 'encode' ? 'Base64 结果' : '解码结果'}
              extra={
                <Button size="small" onClick={handleCopy} disabled={!output}>
                  复制
                </Button>
              }
            >
              <TextArea
                value={output}
                readOnly
                placeholder="转换结果将显示在这里"
                className="code-editor"
                autoSize={{ minRows: 15, maxRows: 25 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
