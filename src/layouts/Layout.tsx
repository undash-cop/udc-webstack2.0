import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from '../components/Breadcrumb';
import CookieConsent from '../components/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container-custom py-4">
          <Breadcrumb />
        </div>
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
