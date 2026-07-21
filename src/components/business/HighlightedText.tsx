'use client';

import { useState } from 'react';
import { Tooltip, Tag } from 'antd';
import type { HighlightSpan } from '@/types';

interface HighlightedTextProps {
  text: string;
  highlights: HighlightSpan[];
}

const riskColors: Record<string, { bg: string; border: string; tag: string }> = {
  high: { bg: 'rgba(255, 77, 79, 0.15)', border: '#ff4d4f', tag: 'error' },
  medium: { bg: 'rgba(250, 173, 20, 0.15)', border: '#faad14', tag: 'warning' },
  low: { bg: 'rgba(82, 196, 26, 0.1)', border: '#52c41a', tag: 'success' },
};

const riskLabels: Record<string, string> = {
  high: 'High Risk',
  medium: 'Medium Risk',
  low: 'Low Risk',
};

function HighlightedText({ text, highlights }: HighlightedTextProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 300;

  if (!highlights || highlights.length === 0) {
    return (
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
        {isLong && !expanded ? (
          <>
            {text.slice(0, 300)}...
            <button
              className="ml-2 text-purple-600 hover:text-purple-800 text-xs font-medium"
              onClick={() => setExpanded(true)}
            >
              Show more
            </button>
          </>
        ) : (
          text
        )}
        {isLong && expanded && (
          <button
            className="ml-2 text-purple-600 hover:text-purple-800 text-xs font-medium"
            onClick={() => setExpanded(false)}
          >
            Show less
          </button>
        )}
      </div>
    );
  }

  const sorted = [...highlights].sort((a, b) => a.start - b.start);

  const segments: { type: 'normal' | 'highlight'; text: string; span?: HighlightSpan }[] = [];
  let currentPos = 0;

  for (const span of sorted) {
    if (span.start > currentPos) {
      segments.push({ type: 'normal', text: text.slice(currentPos, span.start) });
    }
    const highlightText = text.slice(span.start, span.end);
    if (highlightText) {
      segments.push({ type: 'highlight', text: highlightText, span });
    }
    currentPos = Math.max(currentPos, span.end);
  }

  if (currentPos < text.length) {
    segments.push({ type: 'normal', text: text.slice(currentPos) });
  }

  const displaySegments = isLong && !expanded
    ? buildSegmentsForPreview(text, sorted, 300)
    : segments;

  return (
    <div className="leading-relaxed whitespace-pre-wrap text-sm">
      {displaySegments.map((seg, idx) => {
        if (seg.type === 'highlight' && seg.span) {
          const colors = riskColors[seg.span.risk] || riskColors.medium;
          return (
            <Tooltip
              key={idx}
              title={
                <div style={{ maxWidth: 320 }}>
                  <div className="mb-1">
                    <Tag color={colors.tag}>{riskLabels[seg.span.risk]}</Tag>
                    <span className="font-bold">{Math.round(seg.span.score)}%</span>
                  </div>
                  <div className="text-xs mb-1 opacity-80">{seg.span.text}</div>
                  <div className="text-xs border-t border-white/20 pt-1 mt-1">
                    💡 {seg.span.suggestion}
                  </div>
                </div>
              }
              overlayStyle={{ maxWidth: 400 }}
              placement="top"
            >
              <mark
                className="cursor-help rounded-sm px-0.5 transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: colors.bg,
                  borderBottom: `2px solid ${colors.border}`,
                }}
              >
                {seg.text}
              </mark>
            </Tooltip>
          );
        }
        return <span key={idx}>{seg.text}</span>;
      })}
      {isLong && (
        <button
          className="ml-2 text-purple-600 hover:text-purple-800 text-xs font-medium"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

function buildSegmentsForPreview(
  text: string,
  highlights: HighlightSpan[],
  limit: number,
): { type: 'normal' | 'highlight'; text: string; span?: HighlightSpan }[] {
  const segments: { type: 'normal' | 'highlight'; text: string; span?: HighlightSpan }[] = [];
  let currentPos = 0;

  for (const span of highlights) {
    if (currentPos >= limit) break;

    if (span.start > currentPos) {
      const end = Math.min(span.start, limit);
      segments.push({ type: 'normal', text: text.slice(currentPos, end) });
    }

    if (span.start < limit) {
      const highlightEnd = Math.min(span.end, limit);
      const highlightText = text.slice(span.start, highlightEnd);
      if (highlightText) {
        segments.push({
          type: 'highlight',
          text: highlightText,
          span: { ...span, end: span.start + highlightText.length },
        });
      }
    }

    currentPos = span.end;
  }

  if (currentPos < limit) {
    segments.push({ type: 'normal', text: text.slice(currentPos, limit) + '...' });
  } else if (currentPos >= limit) {
    segments.push({ type: 'normal', text: '...' });
  }

  return segments;
}

export default HighlightedText;
