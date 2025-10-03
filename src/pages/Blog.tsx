import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { 
  CalendarIcon, 
  ArrowRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  BookOpenIcon,
  SparklesIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  // Enhanced blog posts with more realistic data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Business: Transforming Operations in 2025",
      excerpt: "Discover how artificial intelligence is revolutionizing business operations, from automation to predictive analytics, and learn how to implement AI solutions in your organization.",
      author: "Dr. Sarah Chen",
      authorRole: "AI Research Director",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2025-10-01",
      readTime: "8 min read",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      featured: true,
      views: 2847,
      likes: 156,
      comments: 23,
      tags: ["AI", "Business", "Automation", "Machine Learning"],
      sources: [
        { name: "McKinsey Global AI Survey 2024", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024" },
        { name: "MIT Technology Review - AI in Business", url: "https://www.technologyreview.com/2024/ai-business-transformation" },
        { name: "Harvard Business Review - AI Strategy", url: "https://hbr.org/2024/ai-strategy-implementation" }
      ]
    },
    {
      id: 7,
      title: "Daily Automation: 10 Tasks You Can Automate Today",
      excerpt: "Transform your daily workflow with these simple automation techniques. From email management to data entry, learn how to save hours every week with smart automation tools.",
      author: "Alex Thompson",
      authorRole: "Automation Specialist",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-28",
      readTime: "6 min read",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      featured: false,
      views: 1923,
      likes: 89,
      comments: 15,
      tags: ["Automation", "Productivity", "Workflow", "Tools", "Efficiency"],
      sources: [
        { name: "Zapier - Automation Best Practices", url: "https://zapier.com/blog/automation-best-practices" },
        { name: "Microsoft Power Automate Documentation", url: "https://docs.microsoft.com/en-us/power-automate" },
        { name: "Forbes - Business Process Automation", url: "https://www.forbes.com/sites/forbestechcouncil/2024/automation-trends" }
      ]
    },
    {
      id: 8,
      title: "Building Smart Workflows: From Manual to Automated",
      excerpt: "Step-by-step guide to identifying repetitive tasks and creating automated workflows that work seamlessly in your organization. Includes real-world examples and best practices.",
      author: "Maria Rodriguez",
      authorRole: "Process Optimization Manager",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-25",
      readTime: "9 min read",
      category: "Workplace",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      featured: false,
      views: 1654,
      likes: 78,
      comments: 12,
      tags: ["Workflow", "Process", "Automation", "Efficiency", "ROI"],
      sources: [
        { name: "Gartner - Process Automation Trends", url: "https://www.gartner.com/en/information-technology/insights/process-automation" },
        { name: "Deloitte - Digital Process Automation", url: "https://www2.deloitte.com/us/en/insights/focus/tech-trends/2024/process-automation.html" },
        { name: "PwC - Workflow Optimization", url: "https://www.pwc.com/us/en/tech-effect/ai-analytics/workflow-automation.html" }
      ]
    },
    {
      id: 9,
      title: "Email Automation: Never Miss Another Important Message",
      excerpt: "Master email automation with advanced filtering, auto-responses, and smart categorization. Learn how to set up systems that handle your inbox while you focus on important work.",
      author: "David Kim",
      authorRole: "Email Marketing Expert",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-22",
      readTime: "7 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      featured: false,
      views: 2134,
      likes: 145,
      comments: 18,
      tags: ["Email", "Automation", "Productivity", "Communication", "Filters"],
      sources: [
        { name: "HubSpot - Email Automation Guide", url: "https://blog.hubspot.com/marketing/email-automation" },
        { name: "Mailchimp - Advanced Email Automation", url: "https://mailchimp.com/marketing-glossary/email-automation" },
        { name: "Campaign Monitor - Email Best Practices", url: "https://www.campaignmonitor.com/resources/guides/email-automation" }
      ]
    },
    {
      id: 10,
      title: "Data Entry Automation: Eliminate Repetitive Tasks",
      excerpt: "Discover powerful tools and techniques to automate data entry processes. From form filling to database updates, learn how to reduce errors and increase efficiency by 90%.",
      author: "Lisa Thompson",
      authorRole: "Data Operations Lead",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-19",
      readTime: "8 min read",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      featured: false,
      views: 1876,
      likes: 92,
      comments: 14,
      tags: ["Data Entry", "Automation", "Excel", "Database", "Accuracy"],
      sources: [
        { name: "Microsoft - Excel Automation", url: "https://docs.microsoft.com/en-us/office/vba/excel/concepts" },
        { name: "UiPath - RPA for Data Entry", url: "https://www.uipath.com/solutions/data-entry-automation" },
        { name: "Automation Anywhere - Data Processing", url: "https://www.automationanywhere.com/solutions/data-entry" }
      ]
    },
    {
      id: 11,
      title: "Social Media Automation: Scale Your Online Presence",
      excerpt: "Learn how to automate your social media strategy without losing the personal touch. Discover tools and techniques for content scheduling, engagement, and analytics.",
      author: "Jennifer Walsh",
      authorRole: "Social Media Strategist",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-16",
      readTime: "10 min read",
      category: "Workplace",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      featured: false,
      views: 2456,
      likes: 167,
      comments: 22,
      tags: ["Social Media", "Automation", "Marketing", "Content", "Engagement"],
      sources: [
        { name: "Hootsuite - Social Media Automation", url: "https://blog.hootsuite.com/social-media-automation" },
        { name: "Buffer - Social Media Management", url: "https://buffer.com/resources/social-media-automation" },
        { name: "Sprout Social - Automation Best Practices", url: "https://sproutsocial.com/insights/social-media-automation" }
      ]
    },
    {
      id: 12,
      title: "Customer Service Automation: 24/7 Support Made Easy",
      excerpt: "Implement intelligent chatbots and automated response systems to provide round-the-clock customer support. Learn how to balance automation with human touch.",
      author: "Robert Johnson",
      authorRole: "Customer Experience Director",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-13",
      readTime: "11 min read",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      featured: false,
      views: 1789,
      likes: 67,
      comments: 9,
      tags: ["Customer Service", "Chatbots", "Support", "Automation", "AI"],
      sources: [
        { name: "Zendesk - Chatbot Implementation", url: "https://www.zendesk.com/blog/chatbot-implementation-guide" },
        { name: "Intercom - AI Customer Support", url: "https://www.intercom.com/blog/ai-customer-support" },
        { name: "Freshworks - Automation in Customer Service", url: "https://www.freshworks.com/customer-service-automation" }
      ]
    },
    {
      id: 13,
      title: "Financial Automation: Streamline Your Accounting",
      excerpt: "Automate invoice processing, expense tracking, and financial reporting with modern accounting tools. Reduce manual work and improve accuracy in your financial operations.",
      author: "Michael Rodriguez",
      authorRole: "Financial Systems Analyst",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-10",
      readTime: "9 min read",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      featured: false,
      views: 1567,
      likes: 83,
      comments: 11,
      tags: ["Finance", "Accounting", "Automation", "Invoicing", "Reporting"],
      sources: [
        { name: "QuickBooks - Accounting Automation", url: "https://quickbooks.intuit.com/r/accounting/accounting-automation" },
        { name: "Xero - Financial Process Automation", url: "https://www.xero.com/blog/accounting-automation" },
        { name: "Sage - Automated Financial Reporting", url: "https://www.sage.com/en-us/blog/automated-financial-reporting" }
      ]
    },
    {
      id: 14,
      title: "Project Management Automation: Never Miss a Deadline",
      excerpt: "Set up automated project tracking, deadline reminders, and progress reports. Learn how to create workflows that keep your team on track and stakeholders informed.",
      author: "Sarah Chen",
      authorRole: "Project Management Expert",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-07",
      readTime: "8 min read",
      category: "Workplace",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      featured: false,
      views: 2034,
      likes: 124,
      comments: 16,
      tags: ["Project Management", "Deadlines", "Tracking", "Automation", "Team"],
      sources: [
        { name: "Asana - Project Automation", url: "https://asana.com/guide/automation" },
        { name: "Monday.com - Workflow Automation", url: "https://monday.com/blog/project-management-automation" },
        { name: "Trello - Power-Ups for Automation", url: "https://trello.com/power-ups/automation" }
      ]
    },
    {
      id: 15,
      title: "Marketing Automation: From Lead to Customer",
      excerpt: "Create automated marketing campaigns that nurture leads and convert prospects into customers. Learn about email sequences, lead scoring, and automated follow-ups.",
      author: "David Kim",
      authorRole: "Marketing Automation Specialist",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-04",
      readTime: "12 min read",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      featured: false,
      views: 2789,
      likes: 198,
      comments: 25,
      tags: ["Marketing", "Lead Generation", "Email Campaigns", "Automation", "Conversion"],
      sources: [
        { name: "Marketo - Marketing Automation Platform", url: "https://www.marketo.com/marketing-automation" },
        { name: "Pardot - Lead Nurturing", url: "https://www.pardot.com/resources/lead-nurturing" },
        { name: "ActiveCampaign - Marketing Automation", url: "https://www.activecampaign.com/marketing-automation" }
      ]
    },
    {
      id: 16,
      title: "HR Automation: Streamline Recruitment and Onboarding",
      excerpt: "Automate resume screening, interview scheduling, and employee onboarding processes. Discover tools that help you find the right candidates faster and onboard them efficiently.",
      author: "Lisa Thompson",
      authorRole: "HR Technology Consultant",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "2025-09-01",
      readTime: "10 min read",
      category: "Workplace",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
      featured: false,
      views: 1654,
      likes: 78,
      comments: 9,
      tags: ["HR", "Recruitment", "Onboarding", "Automation", "Talent"],
      sources: [
        { name: "Workday - HR Automation", url: "https://www.workday.com/en-us/products/human-capital-management.html" },
        { name: "BambooHR - Recruitment Automation", url: "https://www.bamboohr.com/hr-software/recruiting" },
        { name: "Greenhouse - ATS Automation", url: "https://www.greenhouse.io/recruiting-automation" }
      ]
    },
    {
      id: 17,
      title: "Inventory Management Automation: Never Run Out of Stock",
      excerpt: "Implement smart inventory tracking systems that automatically reorder products, predict demand, and optimize stock levels. Reduce waste and improve cash flow.",
      author: "Maria Rodriguez",
      authorRole: "Supply Chain Analyst",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "2025-08-29",
      readTime: "9 min read",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
      featured: false,
      views: 1423,
      likes: 65,
      comments: 8,
      tags: ["Inventory", "Supply Chain", "Automation", "Forecasting", "Optimization"],
      sources: [
        { name: "Oracle - Inventory Management", url: "https://www.oracle.com/scm/inventory-management" },
        { name: "SAP - Supply Chain Automation", url: "https://www.sap.com/products/supply-chain-management.html" },
        { name: "Infor - Inventory Optimization", url: "https://www.infor.com/products/inventory-optimization" }
      ]
    },
    {
      id: 18,
      title: "Document Automation: Create, Process, and Manage Files",
      excerpt: "Automate document creation, processing, and management workflows. Learn how to generate contracts, process forms, and organize files without manual intervention.",
      author: "Alex Thompson",
      authorRole: "Document Management Expert",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "2025-08-26",
      readTime: "7 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      featured: false,
      views: 1892,
      likes: 95,
      comments: 13,
      tags: ["Documents", "Automation", "Processing", "Templates", "Workflow"],
      sources: [
        { name: "DocuSign - Document Automation", url: "https://www.docusign.com/products/document-automation" },
        { name: "Adobe - Document Services", url: "https://www.adobe.com/documentcloud/automation.html" },
        { name: "PandaDoc - Document Workflow", url: "https://www.pandadoc.com/document-automation" }
      ]
    },
    {
      id: 2,
      title: "Cloud Migration Strategies: A Complete Guide for Enterprises",
      excerpt: "Learn the best practices for migrating your infrastructure to the cloud, including security considerations, cost optimization, and performance monitoring.",
      author: "Michael Rodriguez",
      authorRole: "Cloud Solutions Architect",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "2025-08-23",
      readTime: "12 min read",
      category: "Cloud Computing",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      featured: false,
      views: 1923,
      likes: 89,
      comments: 15,
      tags: ["Cloud", "Migration", "AWS", "Azure", "DevOps"],
      sources: [
        { name: "AWS - Cloud Migration Guide", url: "https://aws.amazon.com/migration" },
        { name: "Microsoft Azure - Migration Center", url: "https://azure.microsoft.com/en-us/migration" },
        { name: "Google Cloud - Migration Best Practices", url: "https://cloud.google.com/migration" }
      ]
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices for Remote Work Environments",
      excerpt: "Essential security measures every organization should implement to protect their remote workforce and sensitive data from cyber threats.",
      author: "Jennifer Walsh",
      authorRole: "Cybersecurity Expert",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "2025-08-20",
      readTime: "6 min read",
      category: "Security",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
      featured: false,
      views: 3456,
      likes: 234,
      comments: 31,
      tags: ["Security", "Remote Work", "VPN", "Data Protection"],
      sources: [
        { name: "NIST - Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
        { name: "CISA - Remote Work Security", url: "https://www.cisa.gov/remote-work-security" },
        { name: "SANS - Remote Work Security", url: "https://www.sans.org/remote-work-security" }
      ]
    },
    {
      id: 4,
      title: "Building Scalable Web Applications with Modern JavaScript Frameworks",
      excerpt: "Explore the latest trends in web development and learn how to build high-performance, scalable applications using React, Vue, and Angular.",
      author: "David Kim",
      authorRole: "Senior Full-Stack Developer",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "2025-08-17",
      readTime: "10 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      featured: false,
      views: 1789,
      likes: 67,
      comments: 12,
      tags: ["JavaScript", "React", "Vue", "Angular", "Web Development"],
      sources: [
        { name: "React - Official Documentation", url: "https://react.dev" },
        { name: "Vue.js - Guide", url: "https://vuejs.org/guide" },
        { name: "Angular - Developer Guide", url: "https://angular.io/guide" }
      ]
    },
    {
      id: 5,
      title: "Data Analytics: Turning Raw Data into Business Intelligence",
      excerpt: "Learn how to leverage data analytics tools and techniques to extract meaningful insights from your business data and drive informed decision-making.",
      author: "Lisa Thompson",
      authorRole: "Data Analytics Lead",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "2025-08-14",
      readTime: "9 min read",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      featured: false,
      views: 2134,
      likes: 145,
      comments: 18,
      tags: ["Analytics", "Business Intelligence", "Data Science", "Python", "SQL"],
      sources: [
        { name: "Tableau - Data Visualization", url: "https://www.tableau.com/learn/articles/data-visualization" },
        { name: "Power BI - Business Intelligence", url: "https://powerbi.microsoft.com/en-us/what-is-power-bi" },
        { name: "Python - Data Analysis", url: "https://pandas.pydata.org/docs/user_guide" }
      ]
    },
    {
      id: 6,
      title: "The Future of Work: Digital Transformation in the Modern Workplace",
      excerpt: "Explore how digital transformation is reshaping the modern workplace and discover strategies for successful organizational change management.",
      author: "Robert Johnson",
      authorRole: "Digital Transformation Consultant",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "2025-08-11",
      readTime: "7 min read",
      category: "Workplace",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
      featured: false,
      views: 1654,
      likes: 78,
      comments: 9,
      tags: ["Digital Transformation", "Workplace", "Change Management", "Productivity"],
      sources: [
        { name: "Deloitte - Digital Transformation", url: "https://www2.deloitte.com/us/en/insights/focus/digital-transformation" },
        { name: "Accenture - Future of Work", url: "https://www.accenture.com/us-en/insights/future-workforce" },
        { name: "PwC - Digital Workplace", url: "https://www.pwc.com/us/en/tech-effect/digital-workplace.html" }
      ]
    }
  ];

  const categories = [
    { name: 'All', count: blogPosts.length },
    { name: 'AI & Technology', count: blogPosts.filter(post => post.category === 'AI & Technology').length },
    { name: 'Automation', count: blogPosts.filter(post => post.tags.some(tag => tag.toLowerCase().includes('automation'))).length },
    { name: 'Cloud Computing', count: blogPosts.filter(post => post.category === 'Cloud Computing').length },
    { name: 'Security', count: blogPosts.filter(post => post.category === 'Security').length },
    { name: 'Development', count: blogPosts.filter(post => post.category === 'Development').length },
    { name: 'Analytics', count: blogPosts.filter(post => post.category === 'Analytics').length },
    { name: 'Workplace', count: blogPosts.filter(post => post.category === 'Workplace').length }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  // Filter and sort posts
  const filteredPosts = regularPosts
    .filter(post => {
      const matchesCategory = selectedCategory === 'All' || 
                             post.category === selectedCategory ||
                             (selectedCategory === 'Automation' && post.tags.some(tag => tag.toLowerCase().includes('automation')));
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return (Number(b.likes) + Number(b.comments)) - (Number(a.likes) + Number(a.comments));
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Latest Insights & Trends
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Technology & Automation Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the latest in automation, AI, and technology trends. Learn how to 
            streamline your daily workflows and transform your business with smart automation solutions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
              
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ChartBarIcon className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
              </div>
              <p className="text-gray-600">Our most popular and insightful content</p>
            </div>
            
            <Card className="overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        {featuredPost.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="w-4 h-4" />
                        {featuredPost.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                        {featuredPost.comments}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">{featuredPost.authorRole}</p>
                        <p className="text-sm text-gray-500">{formatDate(featuredPost.date)}</p>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/blog/${featuredPost.id}`}
                      className="btn-primary flex items-center group"
                    >
                      Read Article
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Sources */}
                  {featuredPost.sources && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-3">Sources & References:</p>
                      <div className="flex flex-wrap gap-3">
                        {featuredPost.sources.map((source, index) => (
                          <a
                            key={index}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 underline bg-primary-50 px-3 py-1 rounded-full"
                          >
                            {source.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid/List */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                    <div className="absolute top-4 right-4">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <HeartIcon className="w-4 h-4 text-gray-600" />
                      </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                        {formatDate(post.date)}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                    <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <EyeIcon className="w-3 h-3" />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <HeartIcon className="w-3 h-3" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center group"
                      >
                      Read More
                        <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                  </div>

                    {/* Sources */}
                    {post.sources && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Sources:</p>
                        <div className="flex flex-wrap gap-1">
                          {post.sources.slice(0, 2).map((source, index) => (
                            <a
                              key={index}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary-600 hover:text-primary-700 underline"
                            >
                              {source.name}
                            </a>
                          ))}
                          {post.sources.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{post.sources.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </Card>
            ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center text-gray-500 text-sm">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {formatDate(post.date)}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {post.views} views
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-lg">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{post.author}</p>
                            <p className="text-sm text-gray-500">{post.authorRole}</p>
                          </div>
          </div>
                        
                        <div className="flex items-center gap-4">
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <HeartIcon className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                            <ShareIcon className="w-5 h-5" />
                          </button>
                          <Link 
                            to={`/blog/${post.id}`}
                            className="text-primary-600 hover:text-primary-700 font-medium flex items-center group"
                          >
                            Read Article
                            <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Sources */}
                      {post.sources && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-2">Sources:</p>
                          <div className="flex flex-wrap gap-2">
                            {post.sources.map((source, index) => (
                              <a
                                key={index}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary-600 hover:text-primary-700 underline"
                              >
                                {source.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More Articles
            </button>
          </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Insights
          </h2>
            <p className="text-xl text-primary-100 mb-8">
              Get weekly updates on technology trends, industry insights, and expert advice 
              delivered directly to your inbox. Join 10,000+ professionals who trust our content.
            </p>
            
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email"
              placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-900"
            />
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 mr-2" />
              Subscribe
            </button>
          </div>
          
            <div className="flex items-center justify-center gap-6 text-primary-200 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Weekly Newsletter
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No Spam
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unsubscribe Anytime
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;