'use client';

import { useState } from 'react';
import {
  Card,
  Upload,
  Button,
  Space,
  Typography,
  message,
  Select,
  Slider,
  Row,
  Col,
  Progress,
} from 'antd';
import {
  UploadOutlined,
  FileImageOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

export default function PdfToImagesPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);

  const handleUpload = () => {
    if (fileList.length === 0) {
      message.warning('请先选择 PDF 文件');
      return;
    }

    setConverting(true);
    // 模拟转换过程
    setTimeout(() => {
      setConverting(false);
      message.info('PDF 转图片功能需要后端服务支持，请先启动后端服务');
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Title level={2}>PDF 转图片</Title>
          <Text type="secondary">
            将 PDF 文件的每一页转换为高质量图片
          </Text>
        </div>

        {/* 设置区域 */}
        <Card className="mb-4">
          <Space wrap size="large">
            <Space>
              <Text>输出格式:</Text>
              <Select
                value={format}
                onChange={setFormat}
                style={{ width: 100 }}
                options={[
                  { label: 'PNG', value: 'png' },
                  { label: 'JPEG', value: 'jpeg' },
                  { label: 'WebP', value: 'webp' },
                ]}
              />
            </Space>

            <Space>
              <Text>图片质量:</Text>
              <Slider
                value={quality}
                onChange={setQuality}
                min={10}
                max={100}
                step={10}
                style={{ width: 150 }}
              />
              <Text>{quality}%</Text>
            </Space>

            <Button
              type="primary"
              icon={<FileImageOutlined />}
              onClick={handleUpload}
              loading={converting}
            >
              开始转换
            </Button>
          </Space>
        </Card>

        {/* 上传区域 */}
        <Card>
          <Dragger
            accept=".pdf"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined className="text-4xl text-blue-500" />
            </p>
            <p className="ant-upload-text">点击或拖拽 PDF 文件到此区域</p>
            <p className="ant-upload-hint">
              支持单个 PDF 文件，将转换为指定格式的图片
            </p>
          </Dragger>
        </Card>

        {/* 转换进度 */}
        {converting && (
          <Card className="mt-4">
            <Space direction="vertical" className="w-full">
              <Text>正在转换...</Text>
              <Progress percent={50} status="active" />
            </Space>
          </Card>
        )}

        {/* 使用说明 */}
        <Card className="mt-4" title="使用说明">
          <Paragraph>
            <ol className="list-decimal pl-4">
              <li>选择要转换的 PDF 文件</li>
              <li>设置输出图片格式（PNG/JPEG/WebP）</li>
              <li>调整图片质量（质量越高，文件越大）</li>
              <li>点击"开始转换"按钮</li>
              <li>转换完成后下载图片</li>
            </ol>
          </Paragraph>
        </Card>
      </div>
    </MainLayout>
  );
}
