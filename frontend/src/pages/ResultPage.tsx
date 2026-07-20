import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Progress, Badge, Button, List, Tag, Space, Spin, message } from 'antd';
import { CheckCircleIcon, WarningIcon, CloseCircleIcon, CopyIcon } from '../components/ui/icons';
import { useDetectionStore } from '../stores/useDetectionStore';
import ParagraphItem from '../components/business/ParagraphItem';

function ResultPage() {
  const navigate = useNavigate();
  const { result, isProcessing } = useDetectionStore();

  useEffect(() => {
    if (!result && !isProcessing) {
      navigate('/detection');
    }
  }, [result, isProcessing, navigate]);

  if (isProcessing) {
    return (
      <div className="bg-white dark:bg-slate-950 min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Analyzing..." />
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      default: return '#52c41a';
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'high': return 'High probability of AI-generated content';
      case 'medium': return 'Some sections may be AI-generated';
      default: return 'Your paper appears authentic';
    }
  };

  const getProgressStrokeColor = (score: number) => {
    if (score >= 70) return '#ff4d4f';
    if (score >= 40) return '#faad14';
    return '#52c41a';
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Detection Results
        </h1>

        {/* Overall Score Section */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={24} md={8}>
            <Card
              style={{ borderRadius: 12, textAlign: 'center' }}
              className="shadow-lg h-full"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                AI Score
              </h2>
              <div className="mb-4">
                <Progress
                  type="circle"
                  percent={Math.round(result.ai_score)}
                  width={120}
                  strokeColor={getProgressStrokeColor(result.ai_score)}
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400">Based on AI detection analysis</p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Card
              style={{ borderRadius: 12, textAlign: 'center' }}
              className="shadow-lg h-full"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Risk Level
              </h2>
              <div className="mb-4">
                <Badge
                  count={result.risk_level.toUpperCase()}
                  style={{
                    backgroundColor: getRiskBadgeColor(result.risk_level),
                    fontSize: 18,
                    padding: '8px 16px',
                    borderRadius: 8,
                  }}
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400">{getRiskDescription(result.risk_level)}</p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Card
              style={{ borderRadius: 12, textAlign: 'center' }}
              className="shadow-lg h-full"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Processing Time
              </h2>
              <div className="text-3xl font-bold text-purple-600 mb-4">
                {result.processing_time.toFixed(1)}s
              </div>
              <p className="text-gray-600 dark:text-gray-400">Completed successfully</p>
            </Card>
          </Col>
        </Row>

        {/* Paragraph Analysis */}
        <Card
          title="Paragraph Analysis"
          style={{ borderRadius: 12 }}
          className="shadow-lg mb-8"
        >
          <List
            dataSource={result.paragraphs}
            renderItem={(item, index) => (
              <ParagraphItem key={index} item={item} index={index} />
            )}
          />
        </Card>

        {/* Improvement Suggestions */}
        {result.suggestions.length > 0 && (
          <Card
            title="Improvement Suggestions"
            style={{ borderRadius: 12 }}
            className="shadow-lg mb-8"
          >
            <List
              dataSource={result.suggestions}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckCircleIcon size={18} style={{ color: '#52c41a' }} />}
                    title={item}
                  />
                </List.Item>
              )}
            />
          </Card>
        )}

        {/* Action Buttons */}
        <Card
          style={{ borderRadius: 12, textAlign: 'center' }}
          className="shadow-lg"
        >
          <Space size="large" wrap>
            <Button
              size="large"
              icon={<CopyIcon />}
              onClick={() => {
                const text = result.paragraphs.map(p => p.text).join('\n\n');
                navigator.clipboard.writeText(text);
                message.success('Copied to clipboard');
              }}
            >
              Copy Results
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/detection')}
            >
              Continue Testing
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}

export default ResultPage;
