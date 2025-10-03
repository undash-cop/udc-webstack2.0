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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
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
