'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Tabs, Button, Upload, Input, Space, Alert, message } from 'antd';
import { UploadIcon, FileTextIcon } from '@/components/ui/icons';
import type { TabsProps } from 'antd';
import type { UploadProps } from 'antd';
import { useDetectionStore } from '@/stores/useDetectionStore';

function DetectionPage() {
  const router = useRouter();
  const { isProcessing, detectFile, detectText } = useDetectionStore();
  const [textContent, setTextContent] = useState('');

  const handleFileUpload: UploadProps['customRequest'] = async (options) => {
    const { file } = options;
    await detectFile(file as File);
    const error = useDetectionStore.getState().error;
    if (error) {
      message.error(error);
    } else {
      message.success('Detection completed!');
      router.push('/result');
    }
  };

  const handleAnalyzeText = async () => {
    const trimmed = textContent.trim();
    if (!trimmed) {
      message.warning('Please enter text to analyze');
      return;
    }
    if (trimmed.length < 50) {
      message.warning('Text must be at least 50 characters for analysis');
      return;
    }
    await detectText(textContent);
    const error = useDetectionStore.getState().error;
    if (error) {
      message.error(error);
    } else {
      message.success('Detection completed!');
      router.push('/result');
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '2',
      label: '📝 Paste Text',
      children: (
        <Space orientation="vertical" className="w-full" size="large">
          <Alert
            title="Maximum 30,000 characters"
            type="info"
            showIcon
          />
          <Input.TextArea
            placeholder="Paste your academic text here..."
            rows={12}
            showCount
            maxLength={30000}
            className="border-2"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            disabled={isProcessing}
          />
          <Button
            type="primary"
            size="large"
            icon={<FileTextIcon />}
            block
            loading={isProcessing}
            onClick={handleAnalyzeText}
          >
            Analyze Text
          </Button>
        </Space>
      ),
    },
    {
      key: '1',
      label: '📁 Upload File',
      children: (
        <Space orientation="vertical" className="w-full" size="large">
          <Alert
            title="Supported formats: PDF, DOCX, TXT (Max 10MB)"
            type="info"
            showIcon
          />
          <Upload.Dragger
            name="file"
            accept=".pdf,.docx,.txt"
            multiple={false}
            showUploadList={false}
            customRequest={handleFileUpload}
            disabled={isProcessing}
          >
            <p className="ant-upload-drag-icon">
              <UploadIcon size={48} />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Drag and drop your PDF, DOCX, or TXT file here
            </p>
          </Upload.Dragger>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          AI Detection
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Upload your paper or paste text to detect AI-generated content
        </p>

        <Card
          style={{ borderRadius: 12 }}
          className="shadow-lg"
        >
          <Tabs defaultActiveKey="2" items={items} />
        </Card>
      </div>
    </div>
  );
}

export default DetectionPage;
