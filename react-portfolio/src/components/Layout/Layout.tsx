import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from '@components/BackToTop';
import { GradientMesh } from '@components/GradientMesh';

export const Layout = () => {
  return (
    <>
      <GradientMesh />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};
