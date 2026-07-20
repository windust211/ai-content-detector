import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
}

export default NotFoundPage;
