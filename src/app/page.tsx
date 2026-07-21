'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Card, Button, Typography, Space, Divider } from 'antd';
import {
  CheckCircleIcon,
  LockIcon,
  RocketIcon,
  FileTextIcon,
  ChartIcon,
  ShieldIcon,
  LightningIcon,
} from '@/components/ui/icons';

const { Title, Paragraph, Text } = Typography;

const stats = [
  { value: '30s', label: 'Processing Time', icon: <LightningIcon size={22} /> },
  { value: '99%', label: 'Detection Accuracy', icon: <CheckCircleIcon size={22} /> },
  { value: '10K+', label: 'Papers Analyzed', icon: <FileTextIcon size={22} /> },
  { value: '100%', label: 'Privacy Protected', icon: <ShieldIcon size={22} /> },
];

const features = [
  {
    icon: <RocketIcon size={28} />,
    title: 'Fast & Accurate',
    description: 'Get detection results in seconds with our advanced AI algorithms. High accuracy for academic content.',
  },
  {
    icon: <ChartIcon size={28} />,
    title: 'Detailed Analysis',
    description: 'View per-paragraph AI scores and get actionable suggestions to improve your writing.',
  },
  {
    icon: <LockIcon size={28} />,
    title: 'Privacy First',
    description: 'Your documents are processed securely and never stored. Complete confidentiality guaranteed.',
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(180deg, #f0f5ff 0%, #ffffff 100%)',
          padding: '80px 24px 60px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 40]} align="middle">
            <Col xs={24} md={14}>
              <div style={{ maxWidth: 600 }}>
                <Space orientation="vertical" size={16}>
                  <div>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1677ff',
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        background: '#e6f4ff',
                        padding: '4px 12px',
                        borderRadius: 4,
                        display: 'inline-block',
                      }}
                    >
                      AI Content Detection
                    </Text>
                  </div>
                  <Title
                    level={1}
                    style={{
                      fontSize: 42,
                      fontWeight: 700,
                      margin: 0,
                      lineHeight: 1.2,
                      color: '#141414',
                    }}
                  >
                    Detect AI-Generated Content<br />
                    in Academic Papers
                  </Title>
                  <Paragraph
                    style={{
                      fontSize: 18,
                      color: '#595959',
                      margin: 0,
                      lineHeight: 1.6,
                      maxWidth: 480,
                    }}
                  >
                    Upload your paper and get an instant AI detection report.
                    Know your content risk before submission.
                  </Paragraph>
                  <Space size={16}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<RocketIcon />}
                      onClick={() => router.push('/detection')}
                      style={{
                        height: 48,
                        paddingInline: 28,
                        fontSize: 16,
                        borderRadius: 8,
                      }}
                    >
                      Start Detection
                    </Button>
                    <Button
                      size="large"
                      onClick={() => router.push('/detection')}
                      style={{
                        height: 48,
                        paddingInline: 28,
                        fontSize: 16,
                        borderRadius: 8,
                      }}
                    >
                      Learn More
                    </Button>
                  </Space>
                </Space>
              </div>
            </Col>
            <Col xs={24} md={10}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #e6f4ff 0%, #d6e4ff 100%)',
                  borderRadius: 16,
                  padding: 48,
                  textAlign: 'center',
                }}
              >
                <FileTextIcon size={72} style={{ opacity: 0.6 }} />
                <Divider style={{ borderColor: '#adc6ff', opacity: 0.4 }} />
                <div
                  style={{
                    color: '#595959',
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  Upload your paper in PDF, DOCX, or TXT
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ padding: '48px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
              <Col key={index} xs={12} md={6}>
                <Card
                  styles={{ body: { padding: '20px 16px' } }}
                  style={{
                    textAlign: 'center',
                    borderRadius: 12,
                    border: '1px solid #f0f0f0',
                  }}
                >
                  <div style={{ color: '#1677ff', fontSize: 20, marginBottom: 8 }}>
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#141414',
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 14, color: '#8c8c8c' }}>
                    {stat.label}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '60px 24px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              textAlign: 'center',
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 48,
              color: '#141414',
            }}
          >
            Why Choose AI Paper Detector?
          </Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col key={index} xs={24} md={8}>
                <Card
                  style={{
                    textAlign: 'center',
                    borderRadius: 12,
                    height: '100%',
                    border: '1px solid #f0f0f0',
                  }}
                  styles={{ body: { padding: 32 } }}
                >
                  <div style={{ color: '#1677ff', marginBottom: 16 }}>
                    {feature.icon}
                  </div>
                  <Title
                    level={4}
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      marginBottom: 12,
                      color: '#141414',
                    }}
                  >
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#595959', margin: 0, fontSize: 15 }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
