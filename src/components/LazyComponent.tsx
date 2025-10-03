import { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyComponent = ({ 
  children, 
  fallback = <LoadingSpinner /> 
}: LazyComponentProps) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazyComponent;
