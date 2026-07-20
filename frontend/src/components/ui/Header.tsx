import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

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
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
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
      </a>

      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
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
