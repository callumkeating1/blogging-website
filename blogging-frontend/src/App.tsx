import MainPage from './pages/mainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      {/* Optional: Navbar or layout here */}
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}