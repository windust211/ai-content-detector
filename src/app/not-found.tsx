'use client';

import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
}
