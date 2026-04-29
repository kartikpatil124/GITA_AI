import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CosmicBackground from '../components/CosmicBackground';

export default function MainLayout({ starPulse = false }) {
  const location = useLocation();
  const hideFooter = location.pathname === '/chat';

  return (
    <div className="relative min-h-screen flex flex-col">
      <CosmicBackground pulseMode={starPulse} />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
