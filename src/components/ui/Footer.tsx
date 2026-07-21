'use client';

import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter
      style={{
        background: '#fafafa',
        borderTop: '1px solid #f0f0f0',
        padding: '24px 48px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color: '#8c8c8c',
          fontSize: 14,
        }}
      >
        &copy; {currentYear} AI Paper Detector. All rights reserved.
      </div>
    </AntFooter>
  );
}

export default Footer;
