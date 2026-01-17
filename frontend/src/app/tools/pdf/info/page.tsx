'use client';

import { useState } from 'react';
import {
  Card,
  Upload,
  Button,
  Space,
  Typography,
  message,
  Descriptions,
  Table,
  Empty,
} from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface PdfInfo {
  pageCount: number;
  title: string | null;
  author: string | null;
  subject: string | null;
  creator: string | null;
  producer: string | null;
  creationDate: string | null;
  modificationDate: string | null;
  pages: {
    pageNumber: number;
    width: number;
    height: number;
    rotation: number;
  }[];
}

export default function PdfInfoPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);

  const handleGetInfo = () => {
    if (fileList.length === 0) {
      message.warning('请先选择 PDF 文件');
      return;
    }

    setLoading(true);
    // 模拟获取信息
    setTimeout(() => {
      setLoading(false);
      message.info('PDF 信息获取功能需要后端服务支持，请先启动后端服务');
    }, 1000);
  };

  const pageColumns = [
    { title: '页码', dataIndex: 'pageNumber', key: 'pageNumber' },
    {
      title: '宽度 (pt)',
      dataIndex: 'width',
      key: 'width',
      render: (v: number) => v?.toFixed(2),
    },
    {
      title: '高度 (pt)',
      dataIndex: 'height',
      key: 'height',
      render: (v: number) => v?.toFixed(2),
    },
    { title: '旋转角度', dataIndex: 'rotation', key: 'rotation' },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Title level={2}>PDF 信息查看</Title>
          <Text type="secondary">
            查看 PDF 文件的元数据和页面详细信息
          </Text>
        </div>

        {/* 上传区域 */}
        <Card className="mb-4">
          <Space direction="vertical" className="w-full">
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
              <p className="ant-upload-hint">上传 PDF 文件以查看其详细信息</p>
            </Dragger>

            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              onClick={handleGetInfo}
              loading={loading}
              className="mt-4"
            >
              获取信息
            </Button>
          </Space>
        </Card>

        {/* 信息展示 */}
        {pdfInfo ? (
          <>
            <Card title="文档信息" className="mb-4">
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="标题">
                  {pdfInfo.title || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="作者">
                  {pdfInfo.author || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="主题">
                  {pdfInfo.subject || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="创建程序">
                  {pdfInfo.creator || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="PDF 制作程序">
                  {pdfInfo.producer || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="页数">
                  {pdfInfo.pageCount}
                </Descriptions.Item>
                <Descriptions.Item label="创建日期">
                  {pdfInfo.creationDate || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="修改日期">
                  {pdfInfo.modificationDate || '-'}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="页面信息">
              <Table
                dataSource={pdfInfo.pages}
                columns={pageColumns}
                rowKey="pageNumber"
                pagination={false}
                size="small"
              />
            </Card>
          </>
        ) : (
          <Card>
            <Empty description="请上传 PDF 文件以查看信息" />
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
