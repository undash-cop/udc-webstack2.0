import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { 
  HomeIcon, 
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SEOHead
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to our homepage or explore our products and services."
        noIndex={true}
      />
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {/* 404 Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-600" />
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
            <p className="text-gray-600">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Or try one of these popular pages:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-500 flex items-center justify-center py-2 px-3 rounded-md hover:bg-gray-50"
              >
                <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
                Products
              </Link>
              <Link
                to="/about"
                className="text-primary-600 hover:text-primary-500 flex items-center justify-center py-2 px-3 rounded-md hover:bg-gray-50"
              >
                <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
                About Us
              </Link>
              <Link
                to="/blog"
                className="text-primary-600 hover:text-primary-500 flex items-center justify-center py-2 px-3 rounded-md hover:bg-gray-50"
              >
                <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-primary-600 hover:text-primary-500 flex items-center justify-center py-2 px-3 rounded-md hover:bg-gray-50"
              >
                <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
