import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/ui/Layout';
import HomePage from './pages/HomePage';
import DetectionPage from './pages/DetectionPage';
import ResultPage from './pages/ResultPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/detection" element={<DetectionPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
