import { lazy, Suspense, type ReactNode } from 'react';

// Lazy load the HelmetProvider component
const HelmetProvider = lazy(() => import('react-helmet-async').then(module => ({ default: module.HelmetProvider })));

interface LazyHelmetProviderProps {
  children: ReactNode;
}

const LazyHelmetProvider = ({ children }: LazyHelmetProviderProps) => {
  return (
    <Suspense fallback={<>{children}</>}>
      <HelmetProvider>
        {children}
      </HelmetProvider>
    </Suspense>
  );
};

export default LazyHelmetProvider;
