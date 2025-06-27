import MainPage from './pages/mainPage';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  // specifies the the routes that the page will go to
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}