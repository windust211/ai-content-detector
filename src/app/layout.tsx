import type { Metadata } from 'next';
import { AntdProvider } from '@/components/ui/AntdProvider';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Paper Detector - Detect AI-Generated Content in Academic Papers',
  description:
    'Upload your paper and get an instant AI detection report. Know your content risk before submission. Fast, accurate, and privacy-first.',
  keywords: ['AI detection', 'academic integrity', 'paper analysis', 'AI content detector'],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdProvider>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
            }}
          >
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </AntdProvider>
      </body>
    </html>
  );
}
