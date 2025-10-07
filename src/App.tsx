import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, memo } from 'react';
import LazyHelmetProvider from './components/LazyHelmetProvider';
import { ToastProvider } from './contexts/ToastContext';
import LazyToaster from './components/LazyToaster';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';
// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const ApplyJob = lazy(() => import('./pages/ApplyJob'));
const SendResume = lazy(() => import('./pages/SendResume'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Support = lazy(() => import('./pages/Support'));
const Status = lazy(() => import('./pages/Status'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const ResourceCenter = lazy(() => import('./pages/ResourceCenter'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Optimized loading component
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="loading-spinner"></div>
  </div>
));

function App() {
  return (
    <LazyHelmetProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/apply/:jobId" element={<ApplyJob />} />
                <Route path="/send-resume" element={<SendResume />} />
                <Route path="/job/:jobId" element={<JobDetails />} />
                <Route path="/support" element={<Support />} />
                <Route path="/status" element={<Status />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/resources" element={<ResourceCenter />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
          <LazyToaster />
        </Router>
      </ToastProvider>
    </LazyHelmetProvider>
  );
}

export default App;