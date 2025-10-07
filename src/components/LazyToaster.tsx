import { lazy, Suspense } from 'react';

// Lazy load the Toaster component
const Toaster = lazy(() => import('react-hot-toast').then(module => ({ default: module.Toaster })));

const LazyToaster = () => {
  return (
    <Suspense fallback={null}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#10B981', // Green-500
              secondary: '#ECFDF5', // Green-50
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', // Red-500
              secondary: '#FEF2F2', // Red-50
            },
          },
        }}
      />
    </Suspense>
  );
};

export default LazyToaster;
