'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Layout, Menu } from 'antd';
import { HomeIcon, SearchIcon } from './icons';

const { Header: AntHeader } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <HomeIcon size={16} />,
    label: 'Home',
  },
  {
    key: '/detection',
    icon: <SearchIcon size={16} />,
    label: 'Detection',
  },
];

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AntHeader
      style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}
    >
      <div
        onClick={() => router.push('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #1677ff, #4096ff)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          AP
        </div>
        <span
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: '#262626',
          }}
        >
          AI Paper Detector
        </span>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
        style={{
          border: 'none',
          background: 'transparent',
          minWidth: 200,
          justifyContent: 'flex-end',
        }}
      />
    </AntHeader>
  );
}

export default Header;
