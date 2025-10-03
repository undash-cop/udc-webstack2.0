import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './contexts/ToastContext';
import { initializeAnalytics } from './hooks/useAnalytics';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';
import PerformanceMonitor from './components/PerformanceMonitor';
import ResourcePreloader from './components/ResourcePreloader';
import AccessibilityEnhancer from './components/AccessibilityEnhancer';
// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const Support = lazy(() => import('./pages/Support'));
const Status = lazy(() => import('./pages/Status'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const ResourceCenter = lazy(() => import('./pages/ResourceCenter'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  // Initialize analytics on app start
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <HelmetProvider>
      <ToastProvider>
        <Router>
            <ScrollToTop />
            <PerformanceMonitor />
            <AccessibilityEnhancer />
            <ResourcePreloader
              resources={[
                { type: 'image', href: '/logo.png', as: 'image' }
              ]}
              priority={true}
            />
            <Layout>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
                  <Route path="/careers" element={<Careers />} />
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
          </Router>
        </ToastProvider>
    </HelmetProvider>
  );
}

export default App;