import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {  return (
    <div className="flex flex-col min-h-screen bg-black text-terminal-green pt-4">
      <div className="container mx-auto px-2 shadow-terminal max-w-7xl">
        <Navbar />
        <main className="flex-grow px-4 py-8 md:px-8 min-h-[calc(100vh-180px)]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
