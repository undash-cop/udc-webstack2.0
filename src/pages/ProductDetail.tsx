import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ProductSEO from '../components/ProductSEO';
import companyData from '../data/companyData.js';
import { 
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CogIcon,
  CloudIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  logo: string;
  features: string[];
  benefits: string[];
  pricing: string;
  category: string;
  link: string;
  longDescription?: string;
  specifications?: {
    platform: string;
    deployment: string;
    users: string;
    support: string;
    security: string;
    integration: string;
  };
  screenshots?: string[];
  testimonials?: Array<{
    name: string;
    company: string;
    role: string;
    content: string;
    rating: number;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Find product by ID
    const foundProduct = companyData.products.find((p: any) => 
      p.name.toLowerCase().replace(/\s+/g, '-') === productId
    );

    if (foundProduct) {
      const enhancedProduct: Product = {
        id: foundProduct.name.toLowerCase().replace(/\s+/g, '-'),
        name: foundProduct.name,
        tagline: foundProduct.tagline,
        description: foundProduct.description,
        logo: foundProduct.photo,
        features: foundProduct.features || [],
        benefits: foundProduct.benefits || [],
        pricing: getProductCategory(foundProduct.name) === 'Open Source' ? 'Free / Open Source' : 'Contact for pricing',
        category: getProductCategory(foundProduct.name),
        link: foundProduct.link,
        longDescription: getLongDescription(foundProduct.name),
        specifications: getSpecifications(foundProduct.name),
        screenshots: getScreenshots(),
        testimonials: getTestimonials(foundProduct.name),
        faq: getFAQ(foundProduct.name)
      };
      setProduct(enhancedProduct);
    }
    setLoading(false);
  }, [productId]);

  function getProductCategory(productName: string): string {
    const categoryMap: { [key: string]: string } = {
      'EUP Dashboard': 'HR & Finance',
      'Undash-cop Studio': 'Web Development',
      'Serviso': 'Business Tools',
      'Futuro Expenses': 'Personal Finance',
      'YRB Services': 'IT Services',
      'Fotralife': 'Travel & Community',
      'Aurum Signal': 'AI & Communication',
      'RecruitAI': 'AI + ATS',
      'Game Of Coders': 'AI & Interview Tools',
      'My Macros': 'Health & Fitness (Beta)',
      'Metrics Billing Platform': 'Open Source'
    };
    return categoryMap[productName] || 'Software Solutions';
  }

  function getLongDescription(productName: string): string {
    const descriptions: { [key: string]: string } = {
      'EUP Dashboard': `EUP Dashboard represents the pinnacle of integrated business management solutions, specifically engineered for modern enterprises seeking comprehensive control over their human resources and financial operations. This powerful platform combines intuitive design with robust functionality, enabling organizations to streamline their workforce management, track employee performance, manage payroll systems, and maintain detailed financial records all from a single, unified interface. Built with scalability in mind, EUP Dashboard adapts to businesses of all sizes, from growing startups to established enterprises, providing the tools necessary to make informed decisions and drive organizational success.`,
      'Undash-cop Studio': `Undash-cop Studio is a web development platform for building high-performance websites and web applications. Our tools and templates combine modern technologies with clear design to deliver sites that meet current web standards. Responsive design, mobile optimization, and straightforward functionality help you get a professional site live.`,
      'Serviso': `Serviso is a business management platform that streamlines operations and productivity. It integrates with your existing workflows, providing real-time insights, automated processes, and analytics for decision-making. Whether you're managing customer relationships, inventory, or team projects, Serviso gives you the tools and visibility you need.`,
      'Futuro Expenses': `Futuro Expenses is a sophisticated personal finance management application that brings clarity and control to your financial life. Designed with the modern user in mind, this intuitive platform helps you track spending, set budgets, monitor investments, and plan for the future with confidence. Advanced categorization, smart notifications, and comprehensive reporting features provide the insights you need to make informed financial decisions and achieve your monetary goals.`,
      'YRB Services': `YRB Services provides IT service management solutions that keep your technology infrastructure running smoothly. Our team delivers support, monitoring, and guidance so your systems stay secure, optimized, and aligned with your objectives. We cover network management, cybersecurity, and cloud solutions.`,
      'Fotralife': `Fotralife is a travel and community platform that connects travelers with local experiences and fellow adventurers. It combines social networking with travel planning—discover places, share experiences, and build connections. Matching algorithms, social features, and destination guides help you plan trips and connect with other travelers. Mobile-first design so you have access wherever you go.`,
      'Aurum Signal': `Aurum Signal uses AI in production for business communication in the Indian market. Communicate in 20+ Indian languages via WhatsApp, email, and social media. AI generates and adapts content to improve response quality and consistency. Automated workflows and analytics support reliability and scale.`,
      'RecruitAI': `RecruitAI uses AI in production for recruitment. It automates sourcing, matching, screening, and scheduling—reducing time-to-hire and improving candidate fit. ML-based matching and ranking run on real hiring data. Built for consultancies that need reliable, scalable hiring without sacrificing quality.`,
      'Game Of Coders': `Game Of Coders uses AI in production to assist during technical interviews. Screenshot analysis, real-time transcription, and automatic question detection improve speed and consistency. Dual audio capture and stealth overlay work during screen sharing. Available for Mac, Windows, and Linux.`,
      'My Macros': `My Macros uses AI for nutrition and fitness guidance. Meal suggestions and health answers are driven by models trained on health data—improving consistency and outcomes. Nutrition tracking, macro and micronutrient tracking, real-time sync, offline support. Currently in beta; we're improving based on feedback.`,
      'Metrics Billing Platform': `Metrics Billing Platform is a production-ready, open-source multi-tenant usage-based billing system built by Undash-cop. It is designed for India-first payments using Razorpay, with Cloudflare Workers handling event ingestion and APIs, Cloudflare D1 as hot event storage (acting as a queue with cron polling every 5 minutes), and Amazon RDS (PostgreSQL) as the financial source of truth. The platform supports high-throughput idempotent event ingestion, automated monthly invoice generation, Razorpay webhook reconciliation, professional PDF invoices, email notifications for invoices and payments, full and partial refunds, usage dashboards and analytics APIs, multi-currency support, and threshold, spike, and cost alerts. Security features include API key hashing, role-based access control, rate limiting, optional IP whitelisting, and full audit logging. The entire codebase is open source on GitHub—you can clone, deploy, and customize it for your organisation.`
    };
    return descriptions[productName] || productName;
  }

  function getSpecifications(productName: string) {
    const specs: { [key: string]: any } = {
      'EUP Dashboard': {
        platform: 'Web-based, Mobile Responsive',
        deployment: 'Cloud, On-premise, Hybrid',
        users: 'Unlimited users with role-based access',
        support: '24/7 technical support, Training included',
        security: 'Enterprise-grade encryption, SOC 2 compliant',
        integration: 'REST APIs, Webhooks, SSO, 100+ integrations'
      },
      'Undash-cop Studio': {
        platform: 'Cross-platform (Web, Mobile, Desktop)',
        deployment: 'Cloud hosting, CDN distribution',
        users: 'Unlimited concurrent users',
        support: 'Dedicated project manager, Ongoing maintenance',
        security: 'SSL encryption, Regular security updates',
        integration: 'Third-party APIs, Analytics, Payment gateways'
      },
      'Serviso': {
        platform: 'Web-based, Mobile app available',
        deployment: 'SaaS, Private cloud options',
        users: 'Scalable from 10 to 10,000+ users',
        support: 'Business hours support, Priority support available',
        security: 'Data encryption, Regular backups, Access controls',
        integration: 'ERP systems, CRM platforms, Accounting software'
      },
      'Futuro Expenses': {
        platform: 'iOS, Android, Web application',
        deployment: 'Cloud-based with offline sync',
        users: 'Personal and family accounts',
        support: 'Email support, In-app help center',
        security: 'Bank-level encryption, Biometric authentication',
        integration: 'Bank accounts, Credit cards, Investment platforms'
      },
      'YRB Services': {
        platform: 'Multi-platform support',
        deployment: 'On-site, Remote, Hybrid support',
        users: 'Enterprise-level support',
        support: '24/7 monitoring, Emergency response',
        security: 'Advanced threat protection, Compliance management',
        integration: 'Existing IT infrastructure, Third-party tools'
      },
      'Fotralife': {
        platform: 'iOS, Android, Web platform',
        deployment: 'Cloud-based with global CDN',
        users: 'Community-driven platform',
        support: 'Community support, Premium support available',
        security: 'User data protection, Secure payments',
        integration: 'Social media, Travel booking platforms, Maps'
      },
      'Aurum Signal': {
        platform: 'Web-based, Mobile Responsive',
        deployment: 'Cloud-based SaaS',
        users: 'Scalable from individual to enterprise',
        support: 'Email support, Priority support available',
        security: 'Data encryption, Secure API access',
        integration: 'WhatsApp Business API, Email providers, Social media platforms, CRM systems'
      },
      'RecruitAI': {
        platform: 'Web-based, Mobile Responsive',
        deployment: 'Cloud-based SaaS',
        users: 'Unlimited users with role-based access',
        support: '24/7 technical support, Dedicated account manager',
        security: 'Enterprise-grade encryption, GDPR compliant, Data privacy protection',
        integration: 'Job boards, ATS systems, Email providers, Calendar systems, HRIS platforms'
      },
      'Game Of Coders': {
        platform: 'Desktop Application (Mac, Windows, Linux)',
        deployment: 'Local installation, No cloud required',
        users: 'Single user per license',
        support: 'Email support, Documentation, Community forum',
        security: 'Private & undetectable, Local processing, No data collection',
        integration: 'Screen sharing platforms, Interview tools, AI API integration'
      },
      'My Macros': {
        platform: 'Web-based, Mobile Responsive',
        deployment: 'Cloud-based SaaS (Beta)',
        users: 'Personal and family accounts',
        support: 'Community support, Beta feedback welcome',
        security: 'Privacy-first design, End-to-end encryption, Data ownership',
        integration: 'Health devices, Nutrition databases, Fitness trackers'
      },
      'Metrics Billing Platform': {
        platform: 'Cloudflare Workers, Admin API',
        deployment: 'Cloud-native (Workers, D1, RDS)',
        users: 'Multi-tenant, organisations and projects',
        support: 'Open source, Documentation, Community',
        security: 'API key hashing, RBAC, Rate limiting, Audit logging',
        integration: 'Razorpay, PostgreSQL (RDS), Cloudflare D1'
      }
    };
    return specs[productName] || {};
  }

  function getScreenshots(): string[] {
    // Placeholder screenshots - in real implementation, these would be actual product screenshots
    return [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format'
    ];
  }

  function getTestimonials(productName: string) {
    const testimonials: { [key: string]: any[] } = {
      'EUP Dashboard': [
        {
          name: 'Sarah Johnson',
          company: 'TechCorp Solutions',
          role: 'HR Director',
          content: 'EUP Dashboard has improved our HR operations. The automation saves us significant time and the reporting gives us the insights we need.',
          rating: 5
        },
        {
          name: 'Michael Chen',
          company: 'FinanceFlow Inc',
          role: 'CFO',
          content: 'The financial management tools in EUP Dashboard are solid. We track expenses, manage budgets, and generate reports with ease.',
          rating: 5
        }
      ],
      'Undash-cop Studio': [
        {
          name: 'Emily Rodriguez',
          company: 'Creative Agency',
          role: 'Creative Director',
          content: 'The quality of work from Undash-cop Studio is strong. They understood our vision and delivered what we needed.',
          rating: 5
        },
        {
          name: 'David Kim',
          company: 'StartupXYZ',
          role: 'Founder',
          content: 'Undash-cop Studio helped us build a stunning website that perfectly represents our brand. The team is professional and the results speak for themselves.',
          rating: 5
        }
      ],
      'Serviso': [
        {
          name: 'Lisa Wang',
          company: 'RetailMax',
          role: 'Operations Manager',
          content: 'Serviso has streamlined our business operations significantly. The dashboard gives us real-time visibility into all aspects of our business.',
          rating: 5
        }
      ],
      'Futuro Expenses': [
        {
          name: 'James Wilson',
          company: 'Freelance Consultant',
          role: 'Independent Professional',
          content: 'Futuro Expenses has made managing my finances so much easier. The categorization and budgeting features are exactly what I needed.',
          rating: 5
        }
      ],
      'YRB Services': [
        {
          name: 'Maria Garcia',
          company: 'Enterprise Corp',
          role: 'IT Director',
          content: 'YRB Services has been instrumental in keeping our IT infrastructure running smoothly. Their proactive approach prevents issues before they become problems.',
          rating: 5
        }
      ],
      'Fotralife': [
        {
          name: 'Alex Thompson',
          company: 'Travel Enthusiast',
          role: 'Community Member',
          content: 'Fotralife has connected me with people and places. The community features make travel planning more enjoyable.',
          rating: 5
        }
      ],
      'Aurum Signal': [
        {
          name: 'Rajesh Kumar',
          company: 'Local Retail Business',
          role: 'Business Owner',
          content: 'Aurum Signal has improved how we communicate with customers. Multi-language support has increased our engagement.',
          rating: 5
        },
        {
          name: 'Priya Sharma',
          company: 'E-commerce Startup',
          role: 'Marketing Manager',
          content: 'Aurum Signal\'s AI content and automation have reduced our response time and kept messaging consistent. We focus on strategy while the system handles routine customer communication.',
          rating: 5
        }
      ],
      'RecruitAI': [
        {
          name: 'Michael Chen',
          company: 'TechConsult Solutions',
          role: 'Head of Talent Acquisition',
          content: 'RecruitAI has improved our recruitment process. The 87% automation lets our team focus on building relationships with top candidates. We\'ve reduced time-to-hire while improving candidate quality.',
          rating: 5
        },
        {
          name: 'Sarah Johnson',
          company: 'Global Consulting Group',
          role: 'Recruitment Director',
          content: 'Sourcing and matching with AI surface candidates we would have missed manually. The system has improved our placement success rate and reduced time-to-fill.',
          rating: 5
        },
        {
          name: 'David Kumar',
          company: 'Executive Search Partners',
          role: 'Managing Partner',
          content: 'As a consultancy, we handle high-volume recruitment. RecruitAI has scaled our operations without compromising quality. The automated screening and ranking features ensure we only interview the best candidates.',
          rating: 5
        }
      ],
      'Game Of Coders': [
        {
          name: 'Alex Rodriguez',
          company: 'Software Engineer',
          role: 'Job Seeker',
          content: 'Game Of Coders gave me real-time assistance during my technical interview. The overlay worked during screen sharing and helped me stay consistent under pressure.',
          rating: 5
        },
        {
          name: 'Priya Patel',
          company: 'Full Stack Developer',
          role: 'Career Changer',
          content: 'The screenshot analysis helped me understand complex algorithms and coding problems during my interview. The auto-scroll kept everything visible and organized.',
          rating: 5
        },
        {
          name: 'James Wilson',
          company: 'Data Scientist',
          role: 'Interview Candidate',
          content: 'Game Of Coders helped during my technical interview. The dual audio capture detected questions and provided relevant answers. The privacy features gave me peace of mind.',
          rating: 5
        }
      ],
      'My Macros': [
        {
          name: 'Sarah Mitchell',
          company: 'Fitness Enthusiast',
          role: 'Beta User',
          content: 'My Macros has improved how I track nutrition. Meal suggestions and guidance are consistent and useful. Good beta experience.',
          rating: 5
        },
        {
          name: 'David Chen',
          company: 'Health Coach',
          role: 'Beta Tester',
          content: 'The personalized goals and progress tracking are exactly what my clients need. The privacy-first design and offline support make it reliable for daily use. Great beta experience.',
          rating: 5
        }
      ],
      'Metrics Billing Platform': [
        {
          name: 'Tech Lead',
          company: 'SaaS Startup',
          role: 'Engineering Lead',
          content: 'We needed usage-based billing with Razorpay and multi-tenant support. Metrics Billing Platform gave us a production-ready, open-source solution we could deploy on Cloudflare and RDS. Saved months of build time.',
          rating: 5
        },
        {
          name: 'DevOps Engineer',
          company: 'Enterprise',
          role: 'Platform Engineer',
          content: 'Enterprise-grade security, idempotent ingestion, and full audit trail out of the box. The D1-as-queue and RDS as source of truth architecture is clean and cost-effective. Great open source project.',
          rating: 5
        }
      ]
    };
    return testimonials[productName] || [];
  }

  function getFAQ(productName: string) {
    const faqs: { [key: string]: any[] } = {
      'EUP Dashboard': [
        {
          question: 'How quickly can we get started with EUP Dashboard?',
          answer: 'Most organizations can be up and running within 2-4 weeks, depending on data migration complexity and customization requirements.'
        },
        {
          question: 'Does EUP Dashboard integrate with our existing systems?',
          answer: 'Yes, EUP Dashboard offers extensive integration capabilities with over 100+ popular business applications and systems.'
        },
        {
          question: 'What kind of support do you provide?',
          answer: 'We provide 24/7 technical support, comprehensive training, and ongoing maintenance to ensure your success.'
        }
      ],
      'Undash-cop Studio': [
        {
          question: 'What technologies do you use for web development?',
          answer: 'We use modern technologies including React, Next.js, Node.js, TypeScript, and other current frameworks.'
        },
        {
          question: 'Do you provide ongoing maintenance and support?',
          answer: 'Yes, we offer comprehensive maintenance packages including updates, security patches, and ongoing support.'
        }
      ],
      'Serviso': [
        {
          question: 'Can Serviso scale with our growing business?',
          answer: 'Absolutely! Serviso is designed to scale from small teams to large enterprises, adapting to your changing needs.'
        }
      ],
      'Futuro Expenses': [
        {
          question: 'Is my financial data secure?',
          answer: 'Yes, we use bank-level encryption and security measures to protect your financial information.'
        }
      ],
      'YRB Services': [
        {
          question: 'What types of IT services do you provide?',
          answer: 'We provide IT services including network management, cybersecurity, and cloud solutions.'
        }
      ],
      'Fotralife': [
        {
          question: 'How does the community feature work?',
          answer: 'Fotralife connects you with fellow travelers through advanced matching algorithms and social features.'
        }
      ],
      'Aurum Signal': [
        {
          question: 'Which languages does Aurum Signal support?',
          answer: 'Aurum Signal supports 20+ Indian languages including Hindi, Kannada, Tamil, Telugu, Bengali, Marathi, Gujarati, and many more, enabling businesses to communicate with customers in their preferred language.'
        },
        {
          question: 'Can I integrate Aurum Signal with my existing systems?',
          answer: 'Yes, Aurum Signal offers comprehensive API integration capabilities, allowing you to connect with WhatsApp Business API, email providers, social media platforms, and CRM systems.'
        },
        {
          question: 'How does the AI content generation work?',
          answer: 'Aurum Signal uses AI trained on communication data to generate and adapt content in multiple languages. It improves response quality and consistency while keeping your brand voice. The system runs in production and is tuned for reliability.'
        }
      ],
      'RecruitAI': [
        {
          question: 'How does the 87% automation work?',
          answer: 'RecruitAI automates sourcing from job pools, resume screening, candidate matching, interview scheduling, and communication. Humans handle final interviews and hiring decisions. The result is faster time-to-hire and more consistent screening.'
        },
        {
          question: 'Which job pools does RecruitAI source candidates from?',
          answer: 'RecruitAI integrates with major job boards, professional networks, and recruitment platforms. The system automatically searches and sources candidates from these pools based on your job requirements and preferences.'
        },
        {
          question: 'How accurate is the AI candidate matching?',
          answer: 'RecruitAI uses machine learning trained on your hiring data. The system analyzes skills, experience, and qualifications to rank candidates. Accuracy improves as more decisions feed back into the model. We focus on reliability and consistency in production.'
        },
        {
          question: 'Can RecruitAI integrate with our existing ATS?',
          answer: 'Yes, RecruitAI offers comprehensive integration capabilities with popular ATS systems, HRIS platforms, and recruitment tools, ensuring seamless workflow and data synchronization.'
        },
        {
          question: 'Is RecruitAI suitable for high-volume recruitment?',
          answer: 'Absolutely. RecruitAI is specifically designed for consultancies that handle high-volume recruitment. The platform can process hundreds of candidates simultaneously, making it ideal for scaling your hiring operations without increasing your team size.'
        }
      ],
      'Game Of Coders': [
        {
          question: 'Is Game Of Coders detectable during screen sharing?',
          answer: 'No, Game Of Coders features a stealth overlay mode that is undetectable during screen sharing. The transparent overlay works without being visible to interviewers or screen recording software.'
        },
        {
          question: 'Which operating systems are supported?',
          answer: 'Game Of Coders is available for Mac, Windows, and Linux, ensuring compatibility with all major desktop operating systems.'
        },
        {
          question: 'How does the real-time audio transcription work?',
          answer: 'Game Of Coders uses dual audio capture to detect interview questions in real time. The system transcribes audio and returns responses from production AI models—improving speed and consistency during the interview.'
        },
        {
          question: 'Is my data private and secure?',
          answer: 'Yes, Game Of Coders is designed with complete privacy in mind. The application processes data locally and does not collect or store any personal information. All AI processing can be done with your own API keys.'
        },
        {
          question: 'How does the screenshot analysis feature work?',
          answer: 'You can capture screenshots of code, diagrams, or technical problems during your interview. Game Of Coders runs them through production AI models to return explanations and solutions—reducing latency and keeping quality consistent.'
        }
      ],
      'My Macros': [
        {
          question: 'What does "Beta" mean for My Macros?',
          answer: 'My Macros is currently in beta, which means we\'re actively improving the product based on early user feedback. You get early access to new features and can help shape the future of the platform. Some features may change as we refine the experience.'
        },
        {
          question: 'How does the AI health assistant work?',
          answer: 'The health assistant uses AI trained on nutrition and health data to answer questions and suggest meals. Recommendations adapt to your goals and inputs. The system is built for consistency and reliability in daily use.'
        },
        {
          question: 'Is my health data private?',
          answer: 'Yes. My Macros is designed with privacy-first principles. Your health data is protected with enterprise-grade security, end-to-end encryption where applicable, and you retain full ownership of your data.'
        },
        {
          question: 'Where can I try My Macros?',
          answer: 'You can try My Macros at https://noobstoday.netlify.app/. Sign up to join the beta and start your health journey today.'
        }
      ],
      'Metrics Billing Platform': [
        {
          question: 'Is Metrics Billing Platform really open source?',
          answer: 'Yes. The full source code is available on GitHub at https://github.com/undash-cop/metrics-billable-platform. You can clone, deploy, and customize it for your organisation. It is production-ready with enterprise-grade security and reliability.'
        },
        {
          question: 'What payment providers are supported?',
          answer: 'The platform is designed for India-first payments using Razorpay, with webhook reconciliation for invoices, payments, and refunds. Multi-currency support and currency conversion are also available.'
        },
        {
          question: 'What is the architecture?',
          answer: 'Clients send events to Cloudflare Workers (/events). Events are stored in Cloudflare D1 (hot storage). A cron job runs every 5 minutes to migrate and aggregate data to Amazon RDS (PostgreSQL), which is the financial source of truth. Invoices and payments are processed via the Admin API and Razorpay.'
        },
        {
          question: 'How do I get started?',
          answer: 'Clone the repository from GitHub, run the RDS and D1 migrations, configure Razorpay and environment variables, then deploy with wrangler. Full documentation and quick start guides are available in the repository.'
        }
      ]
    };
    return faqs[productName] || [];
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product?.name,
    "description": product?.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": product?.specifications?.platform || "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "screenshot": product?.screenshots?.[0] || "",
    "featureList": product?.features,
    "provider": {
      "@type": "Organization",
      "name": "Undash-cop Private Limited",
      "url": "https://undash-cop.com"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-section">Product Not Found</h1>
          <p className="text-neutral-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEOHead 
        title={`${product.name} - ${product.category} Solution | Undash-cop`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, software solution, business tools`}
        structuredData={structuredData}
      />
      <ProductSEO product={product} />

      {/* Breadcrumb */}
      <div className="bg-neutral-50 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-neutral-500 hover:text-primary-600">Home</Link>
            <span className="text-neutral-400">/</span>
            <Link to="/products" className="text-neutral-500 hover:text-primary-600">Products</Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mr-6 border border-neutral-200 shadow-soft">
                  <img 
                    src={product.logo} 
                    alt={`${product.name} logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="heading-page mb-2">{product.name}</h1>
                  {product.tagline && (
                    <p className="text-lg text-primary-600 font-semibold mb-3 italic">
                      {product.tagline}
                    </p>
                  )}
                  <span className="inline-block px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-lg inline-flex items-center justify-center"
                >
                  Try Now
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
                <div className="flex-1 text-center py-4 px-8 border border-primary-600 rounded-lg">
                  <span className="text-2xl font-bold text-primary-600">
                    {product.pricing}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="card p-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">Key Features</h3>
                <div className="space-y-4">
                  {product.features.slice(0, 6).map((feature: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-custom">
          <nav className="flex space-x-8">
            {['overview', 'features', 'specifications', 'testimonials', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {activeTab === 'overview' && (
            <div className="max-w-4xl">
              <h2 className="heading-section-lg mb-8">Product Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {product.longDescription}
                </p>
              </div>

              {/* Screenshots */}
              {product.screenshots && product.screenshots.length > 0 && (
                <div className="mt-12">
                  <h3 className="heading-section mb-6">Screenshots</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {product.screenshots.map((screenshot: string, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                        <img 
                          src={screenshot} 
                          alt={`${product.name} screenshot ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="max-w-4xl">
              <h2 className="heading-section-lg mb-8">Features & Benefits</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Features */}
                <div>
                  <h3 className="heading-section mb-6 flex items-center">
                    <CogIcon className="w-6 h-6 mr-3 text-primary-600" />
                    All Features
                  </h3>
                  <div className="space-y-4">
                    {product.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-neutral-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="heading-section mb-6 flex items-center">
                    <ShieldCheckIcon className="w-6 h-6 mr-3 text-primary-600" />
                    Benefits
                  </h3>
                  <div className="space-y-4">
                    {product.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-neutral-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && product.specifications && (
            <div className="max-w-4xl">
              <h2 className="heading-section-lg mb-8">Technical Specifications</h2>
              
              <div className="bg-neutral-50 rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {key === 'platform' && <GlobeAltIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'deployment' && <CloudIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'users' && <UsersIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'support' && <ClockIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'security' && <LockClosedIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'integration' && <ChartBarIcon className="w-6 h-6 text-primary-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-neutral-600">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && product.testimonials && product.testimonials.length > 0 && (
            <div className="max-w-4xl">
              <h2 className="heading-section-lg mb-8">Customer Testimonials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.testimonials.map((testimonial: any, index: number) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-neutral-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-600 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                        <p className="text-sm text-neutral-500">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && product.faq && product.faq.length > 0 && (
            <div className="max-w-4xl">
              <h2 className="heading-section-lg mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {product.faq.map((item: any, index: number) => (
                  <div key={index} className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="font-semibold text-neutral-900 mb-3">{item.question}</h3>
                    <p className="text-neutral-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="heading-section text-white mb-0">
            Ready to Get Started with {product.name}?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Startups and growing businesses use our software, cloud, and automation. Get in touch to discuss your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg inline-flex items-center justify-center"
            >
              Try {product.name} Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <Link
              to="/contact"
              className="btn-outline-light btn-lg inline-flex items-center justify-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;