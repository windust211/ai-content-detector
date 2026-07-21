'use client';

import { useState } from 'react';
import { Button, Progress, Tag } from 'antd';
import { CheckCircleIcon, WarningIcon, CloseCircleIcon } from '@/components/ui/icons';
import HighlightedText from './HighlightedText';
import type { ParagraphResult } from '@/types';

interface ParagraphItemProps {
  item: ParagraphResult;
  index: number;
}

function ParagraphItem({ item, index }: ParagraphItemProps) {
  const [showText, setShowText] = useState(false);
  const hasHighlights = item.highlights && item.highlights.length > 0;

  return (
    <div className="flex-col items-start" style={{ padding: '12px 0', width: '100%' }}>
      <div className="w-full mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-900">
            Paragraph {index + 1}
          </span>
          <Progress
            percent={Math.round(item.score)}
            size="small"
            style={{ width: 120 }}
            strokeColor={
              item.risk === 'high' ? '#ff4d4f'
              : item.risk === 'medium' ? '#faad14'
              : '#52c41a'
            }
          />
          <Tag
            icon={
              item.risk === 'low'
                ? <CheckCircleIcon size={16} />
                : item.risk === 'medium'
                  ? <WarningIcon size={16} />
                  : <CloseCircleIcon size={16} />
            }
            color={
              item.risk === 'low'
                ? 'success'
                : item.risk === 'medium'
                  ? 'warning'
                  : 'error'
            }
          >
            {item.risk.toUpperCase()} - {Math.round(item.score)}%
          </Tag>
          {hasHighlights && (
            <Tag icon={<WarningIcon size={14} />} color="purple">
              {item.highlights.length} highlight(s)
            </Tag>
          )}
        </div>
        <Button
          type="link"
          size="small"
          onClick={() => setShowText(!showText)}
        >
          {showText ? 'Hide text' : 'View text'}
        </Button>
      </div>
      {showText && (
        <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
          <HighlightedText
            text={item.text}
            highlights={item.highlights || []}
          />
        </div>
      )}
    </div>
  );
}

export default ParagraphItem;
