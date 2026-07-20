import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

function LayoutComponent() {
  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default LayoutComponent;
