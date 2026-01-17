'use client';

import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  Typography,
  message,
  ColorPicker,
  Row,
  Col,
  Divider,
} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import type { Color } from 'antd/es/color-picker';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;

export default function ColorPickerPage() {
  const [color, setColor] = useState<Color | string>('#3b82f6');

  const getColorString = (c: Color | string): string => {
    if (typeof c === 'string') return c;
    return c.toHexString();
  };

  const hexColor = getColorString(color);
  
  const getRgb = () => {
    if (typeof color === 'string') {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return { r, g, b };
    }
    return color.toRgb();
  };
  
  const rgb = getRgb();
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
  const getHsl = () => {
    const { r, g, b } = rgb;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const l = (max + min) / 2;
    
    if (max === min) {
      return { h: 0, s: 0, l: Math.round(l * 100) };
    }
    
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    let h = 0;
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6;
        break;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };
  
  const hsl = getHsl();
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success('已复制: ' + text);
    } catch {
      message.error('复制失败');
    }
  };

  const presetColors = [
    '#f5222d', '#fa541c', '#fa8c16', '#faad14', '#fadb14',
    '#a0d911', '#52c41a', '#13c2c2', '#1677ff', '#2f54eb',
    '#722ed1', '#eb2f96', '#000000', '#434343', '#8c8c8c',
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Title level={2}>颜色选择器</Title>
          <Text type="secondary">
            选择颜色并获取多种格式的颜色值
          </Text>
        </div>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Card title="选择颜色">
              <Space direction="vertical" size="large" className="w-full">
                <div className="flex justify-center">
                  <ColorPicker
                    value={color}
                    onChange={setColor}
                    size="large"
                    showText
                    presets={[
                      {
                        label: '推荐颜色',
                        colors: presetColors,
                      },
                    ]}
                  />
                </div>

                {/* 颜色预览 */}
                <div
                  className="w-full h-32 rounded-lg shadow-inner"
                  style={{ backgroundColor: hexColor }}
                />
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="颜色值">
              <Space direction="vertical" className="w-full" size="middle">
                {/* HEX */}
                <div>
                  <Text type="secondary" className="text-xs">HEX</Text>
                  <Input.Group compact className="flex">
                    <Input
                      value={hexColor}
                      readOnly
                      className="flex-1 code-editor"
                    />
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => handleCopy(hexColor)}
                    />
                  </Input.Group>
                </div>

                {/* RGB */}
                <div>
                  <Text type="secondary" className="text-xs">RGB</Text>
                  <Input.Group compact className="flex">
                    <Input
                      value={rgbString}
                      readOnly
                      className="flex-1 code-editor"
                    />
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => handleCopy(rgbString)}
                    />
                  </Input.Group>
                </div>

                {/* HSL */}
                <div>
                  <Text type="secondary" className="text-xs">HSL</Text>
                  <Input.Group compact className="flex">
                    <Input
                      value={hslString}
                      readOnly
                      className="flex-1 code-editor"
                    />
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => handleCopy(hslString)}
                    />
                  </Input.Group>
                </div>

                <Divider />

                {/* 单独的 RGB 值 */}
                <div>
                  <Text type="secondary" className="text-xs mb-2 block">RGB 分量</Text>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input addonBefore="R" value={rgb.r} readOnly size="small" />
                    </Col>
                    <Col span={8}>
                      <Input addonBefore="G" value={rgb.g} readOnly size="small" />
                    </Col>
                    <Col span={8}>
                      <Input addonBefore="B" value={rgb.b} readOnly size="small" />
                    </Col>
                  </Row>
                </div>

                {/* 单独的 HSL 值 */}
                <div>
                  <Text type="secondary" className="text-xs mb-2 block">HSL 分量</Text>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input addonBefore="H" value={`${hsl.h}°`} readOnly size="small" />
                    </Col>
                    <Col span={8}>
                      <Input addonBefore="S" value={`${hsl.s}%`} readOnly size="small" />
                    </Col>
                    <Col span={8}>
                      <Input addonBefore="L" value={`${hsl.l}%`} readOnly size="small" />
                    </Col>
                  </Row>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
