import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import LangtonsAntPage from './pages/LangtonsAntPage';
import BoidsPage from './pages/BoidsPage';
import LSystemsPage from './pages/LSystemsPage';
import LeniaPage from './pages/LeniaPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import DemoPage from './pages/DemoPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas de experiencia completa fuera del MainLayout */}
        <Route path="langtons-ant" element={<LangtonsAntPage />} />
        
        {/* Páginas regulares dentro del MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="boids" element={<BoidsPage />} />
          <Route path="l-systems" element={<LSystemsPage />} />
          <Route path="lenia" element={<LeniaPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="demo" element={<DemoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
