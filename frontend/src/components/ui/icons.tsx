import type { SVGProps } from 'react';

const blue = '#1677ff';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function createIcon(paths: React.ReactNode, viewBox = '0 0 24 24') {
  return ({ size = 20, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: '-0.15em', ...style }}
      {...props}
    >
      {paths}
    </svg>
  );
}

// Home - a simple house
export const HomeIcon = createIcon(
  <>
    <path d="M5 12.5L12 5l7 7.5" stroke={blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21V12h6v9" stroke={blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="7" y="16" width="10" height="5" rx="1" stroke={blue} strokeWidth="1.8" />
  </>
);

// Search / Detection - document with magnifying glass
export const SearchIcon = createIcon(
  <>
    <path d="M6 3h9a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V8l4-5z" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 8h5V3" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="16" r="3" stroke={blue} strokeWidth="1.8" />
    <path d="M14 18l2 2" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
  </>
);

// Upload - arrow up into tray
export const UploadIcon = createIcon(
  <>
    <path d="M12 3v11" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 7l4-4 4 4" stroke={blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
  </>
);

// File Text - document with lines
export const FileTextIcon = createIcon(
  <>
    <path d="M6 2h9a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V7l4-5z" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 7h5V2" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
    <line x1="8" y1="12" x2="14" y2="12" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="16" x2="13" y2="16" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="20" x2="11" y2="20" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
  </>
);

// Check Circle - circle with checkmark
export const CheckCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" stroke={blue} strokeWidth="1.8" />
    <path d="M8 12l3 3 5-5" stroke={blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

// Rocket
export const RocketIcon = createIcon(
  <>
    <path d="M12 2s-4 5-4 10a4 4 0 008 0c0-5-4-10-4-10z" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="11" r="2" stroke={blue} strokeWidth="1.8" />
    <path d="M8 17l-2 3h12l-2-3" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
  </>
);

// Lock / Security
export const LockIcon = createIcon(
  <>
    <rect x="7" y="10" width="10" height="10" rx="2" stroke={blue} strokeWidth="1.8" />
    <path d="M8 10V7a4 4 0 018 0v3" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1.5" fill={blue} />
    <line x1="12" y1="16.5" x2="12" y2="18" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
  </>
);

// Shield / Safety
export const ShieldIcon = createIcon(
  <>
    <path d="M12 2l8 3.5V11c0 5.5-3.5 10-8 11-4.5-1-8-5.5-8-11V5.5L12 2z" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke={blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

// Bar Chart
export const ChartIcon = createIcon(
  <>
    <rect x="4" y="14" width="4" height="6" rx="1" fill={blue} opacity="0.5" />
    <rect x="10" y="9" width="4" height="11" rx="1" fill={blue} opacity="0.7" />
    <rect x="16" y="4" width="4" height="16" rx="1" fill={blue} />
  </>
);

// Arrow Right
export const ArrowRightIcon = createIcon(
  <>
    <line x1="4" y1="12" x2="20" y2="12" stroke={blue} strokeWidth="2" strokeLinecap="round" />
    <path d="M14 6l6 6-6 6" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

// Thunderbolt / Lightning
export const LightningIcon = createIcon(
  <>
    <path d="M13 2L4 13h7l-1 9 9-11h-7l1-9z" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
  </>
);

// Download
export const DownloadIcon = createIcon(
  <>
    <path d="M12 3v11" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 10l4 4 4-4" stroke={blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
  </>
);

// Copy - two overlapping squares
export const CopyIcon = createIcon(
  <>
    <rect x="7" y="7" width="11" height="11" rx="2" stroke={blue} strokeWidth="1.8" />
    <path d="M4 14V5a1 1 0 011-1h9" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
  </>
);

// Warning / Alert
export const WarningIcon = createIcon(
  <>
    <path d="M12 3L2 20h20L12 3z" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
    <line x1="12" y1="10" x2="12" y2="15" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1" fill={blue} />
  </>
);

// Close / X Circle
export const CloseCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" stroke={blue} strokeWidth="1.8" />
    <line x1="9" y1="9" x2="15" y2="15" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="15" y1="9" x2="9" y2="15" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
  </>
);
