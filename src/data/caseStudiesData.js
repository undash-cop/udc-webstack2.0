export const caseStudiesData = [
  {
    id: 1,
    title: "E-Commerce Platform Transformation",
    client: "TechRetail Inc.",
    industry: "E-Commerce",
    duration: "6 months",
    teamSize: "8 developers",
    budget: "$150,000",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format",
    challenge: "Legacy e-commerce platform struggling with performance, scalability, and user experience issues affecting sales and customer satisfaction.",
    solution: "Complete platform rebuild using modern technologies including React, Node.js, and cloud infrastructure with microservices architecture.",
    results: [
      "300% increase in page load speed",
      "150% improvement in conversion rate",
      "99.9% uptime achieved",
      "50% reduction in operational costs"
    ],
    technologies: ["React", "Node.js", "AWS", "MongoDB", "Redis"],
    testimonial: {
      quote: "Undash-cop transformed our entire digital presence. The new platform not only looks amazing but performs exceptionally well. Our sales have increased significantly.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "TechRetail Inc."
    },
    featured: true,
    views: 1247,
    likes: 89,
    shares: 23,
    comments: 12,
    publishedDate: "2025-01-15",
    lastUpdated: "2025-01-20",
    status: "completed",
    projectPhase: "Live & Maintained",
    projectTimeline: [
      { phase: "Discovery & Planning", duration: "2 weeks", completed: true },
      { phase: "UI/UX Design", duration: "3 weeks", completed: true },
      { phase: "Development", duration: "16 weeks", completed: true },
      { phase: "Testing & QA", duration: "4 weeks", completed: true },
      { phase: "Deployment", duration: "1 week", completed: true },
      { phase: "Maintenance", duration: "Ongoing", completed: false }
    ],
    metrics: {
      performance: { before: 2.3, after: 0.8, unit: "seconds" },
      conversion: { before: 2.1, after: 5.2, unit: "%" },
      uptime: { before: 95.2, after: 99.9, unit: "%" },
      cost: { before: 50000, after: 25000, unit: "$/month" }
    },
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format"
      ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    documents: [
      { name: "Project Summary", type: "PDF", size: "2.3 MB" },
      { name: "Technical Architecture", type: "PDF", size: "5.1 MB" },
      { name: "Performance Report", type: "PDF", size: "1.8 MB" }
    ]
  },
  {
    id: 2,
    title: "Healthcare Data Management System",
    client: "MediCare Solutions",
    industry: "Healthcare",
    duration: "8 months",
    teamSize: "12 developers",
    budget: "$200,000",
    image: "https://plus.unsplash.com/premium_photo-1661439789647-8d64959844bf?w=800&h=400&fit=crop&auto=format",
    challenge: "Healthcare provider needed a secure, HIPAA-compliant system to manage patient data, appointments, and medical records efficiently.",
    solution: "Custom healthcare management platform with advanced security features, patient portal, and integration with existing medical systems.",
    results: [
      "40% reduction in administrative time",
      "99.5% data accuracy achieved",
      "100% HIPAA compliance",
      "60% improvement in patient satisfaction"
    ],
    technologies: ["Vue.js", "Python", "PostgreSQL", "Docker", "AWS"],
    testimonial: {
      quote: "The new system has revolutionized our patient care. Everything is now organized, secure, and easily accessible.",
      author: "Dr. Michael Chen",
      role: "Medical Director",
      company: "MediCare Solutions"
    },
    featured: false,
    views: 892,
    likes: 67,
    shares: 15,
    comments: 8,
    publishedDate: "2025-01-10",
    lastUpdated: "2025-01-18",
    status: "completed",
    projectPhase: "Live & Maintained"
  },
  {
    id: 3,
    title: "Financial Trading Platform",
    client: "TradeMax Financial",
    industry: "FinTech",
    duration: "10 months",
    teamSize: "15 developers",
    budget: "$300,000",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format",
    challenge: "Financial services company needed a high-performance trading platform with real-time data processing and advanced analytics.",
    solution: "Built a scalable trading platform with microservices architecture, real-time data streaming, and advanced risk management features.",
    results: [
      "99.99% uptime achieved",
      "50% faster trade execution",
      "200% increase in trading volume",
      "Zero security incidents"
    ],
    technologies: ["React", "Node.js", "Kafka", "PostgreSQL", "Redis", "Docker"],
    testimonial: {
      quote: "The platform has transformed our trading operations. We can now handle 10x more volume with better performance and security.",
      author: "Jennifer Martinez",
      role: "Head of Technology",
      company: "TradeMax Financial"
    },
    featured: true,
    views: 1567,
    likes: 124,
    shares: 31,
    comments: 18,
    publishedDate: "2025-01-05",
    lastUpdated: "2025-01-15",
    status: "completed",
    projectPhase: "Live & Maintained"
  },
  {
    id: 4,
    title: "Manufacturing IoT Dashboard",
    client: "Industrial Dynamics",
    industry: "Manufacturing",
    duration: "4 months",
    teamSize: "6 developers",
    budget: "$120,000",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop&auto=format",
    challenge: "Manufacturing company needed real-time monitoring of production lines and equipment performance to optimize operations.",
    solution: "IoT dashboard with real-time data visualization, predictive analytics, and automated alerting system for production optimization.",
    results: [
      "25% increase in production efficiency",
      "30% reduction in downtime",
      "40% improvement in quality control",
      "Real-time monitoring of 50+ machines"
    ],
    technologies: ["React", "Python", "InfluxDB", "Grafana", "MQTT", "Docker"],
    testimonial: {
      quote: "The IoT dashboard has given us unprecedented visibility into our operations. We've significantly improved our efficiency and reduced waste.",
      author: "Robert Kim",
      role: "Operations Director",
      company: "Industrial Dynamics"
    },
    featured: false,
    views: 743,
    likes: 56,
    shares: 12,
    comments: 7,
    publishedDate: "2025-01-08",
    lastUpdated: "2025-01-16",
    status: "completed",
    projectPhase: "Live & Maintained"
  },
  {
    id: 5,
    title: "Educational Learning Management System",
    client: "EduTech Academy",
    industry: "Education",
    duration: "7 months",
    teamSize: "10 developers",
    budget: "$180,000",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop&auto=format",
    challenge: "Educational institution needed a comprehensive LMS to manage courses, students, and online learning content effectively.",
    solution: "Full-featured learning management system with video streaming, interactive content, assessment tools, and student progress tracking.",
    results: [
      "80% increase in student engagement",
      "60% reduction in administrative workload",
      "95% student satisfaction rate",
      "Support for 10,000+ concurrent users"
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "FFmpeg", "Stripe"],
    testimonial: {
      quote: "The LMS has revolutionized our teaching approach. Students are more engaged and we can track their progress effectively.",
      author: "Dr. Lisa Thompson",
      role: "Academic Director",
      company: "EduTech Academy"
    },
    featured: false,
    views: 634,
    likes: 43,
    shares: 9,
    comments: 5,
    publishedDate: "2025-01-12",
    lastUpdated: "2025-01-19",
    status: "completed",
    projectPhase: "Live & Maintained"
  },
  {
    id: 6,
    title: "Real Estate CRM System",
    client: "PropertyMax Realty",
    industry: "Real Estate",
    duration: "3 months",
    teamSize: "5 developers",
    budget: "$90,000",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&auto=format",
    challenge: "Real estate agency needed a comprehensive CRM system to manage leads, properties, and client relationships more effectively.",
    solution: "Custom CRM platform with lead management, property listings, client communication tools, and automated follow-up systems.",
    results: [
      "150% increase in lead conversion",
      "40% improvement in response time",
      "70% reduction in manual data entry",
      "80% increase in client satisfaction"
    ],
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Twilio"],
    testimonial: {
      quote: "The CRM system has transformed how we manage our business. We're closing more deals and providing better service to our clients.",
      author: "Robert Martinez",
      role: "Managing Partner",
      company: "PropertyMax Realty"
    },
    featured: false,
    views: 521,
    likes: 38,
    shares: 6,
    comments: 3,
    publishedDate: "2025-01-14",
    lastUpdated: "2025-01-21",
    status: "completed",
    projectPhase: "Live & Maintained"
    },
    {
      id: 7,
      title: "Smart City IoT Platform",
      client: "MetroCity Government",
      industry: "Government",
      duration: "12 months",
      teamSize: "20 developers",
      budget: "$500,000",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop&auto=format",
      challenge: "City government needed an integrated IoT platform to monitor traffic, air quality, waste management, and public safety across the entire metropolitan area.",
      solution: "Comprehensive smart city platform with real-time data collection, AI-powered analytics, citizen mobile app, and automated response systems.",
      results: [
        "35% reduction in traffic congestion",
        "40% improvement in air quality monitoring",
        "60% faster emergency response times",
        "25% reduction in energy consumption"
      ],
      technologies: ["React", "Python", "IoT", "Machine Learning", "PostgreSQL", "Redis"],
      testimonial: {
        quote: "The smart city platform has transformed how we manage urban services. Citizens are happier, and our operational efficiency has dramatically improved.",
        author: "Mayor Jennifer Liu",
        role: "City Mayor",
        company: "MetroCity Government"
      },
      featured: true,
      views: 2156,
      likes: 178,
      shares: 45,
      comments: 28,
      publishedDate: "2025-01-25",
      lastUpdated: "2025-01-30",
      status: "completed",
      projectPhase: "Live & Maintained"
    },
    {
      id: 8,
      title: "AgriTech Farm Management System",
      client: "GreenFields Agriculture",
      industry: "Agriculture",
      duration: "9 months",
      teamSize: "12 developers",
      budget: "$280,000",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop&auto=format",
      challenge: "Large-scale farming operation needed precision agriculture tools to optimize crop yields, monitor soil conditions, and manage resources efficiently.",
      solution: "Integrated farm management platform with drone monitoring, soil sensors, weather integration, and predictive analytics for crop optimization.",
      results: [
        "30% increase in crop yields",
        "20% reduction in water usage",
        "45% improvement in pest detection",
        "35% reduction in fertilizer costs"
      ],
      technologies: ["Vue.js", "Python", "IoT", "Computer Vision", "MongoDB", "AWS"],
      testimonial: {
        quote: "This system has revolutionized our farming operations. We're producing more with less resources and making data-driven decisions every day.",
        author: "Robert Thompson",
        role: "Farm Operations Director",
        company: "GreenFields Agriculture"
      },
      featured: false,
      views: 1432,
      likes: 95,
      shares: 22,
      comments: 14,
      publishedDate: "2025-01-22",
      lastUpdated: "2025-01-28",
      status: "completed",
      projectPhase: "Live & Maintained"
    },
    {
      id: 9,
      title: "Logistics & Supply Chain Optimization",
      client: "Global Logistics Corp",
      industry: "Logistics",
      duration: "11 months",
      teamSize: "18 developers",
      budget: "$420,000",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop&auto=format",
      challenge: "Global logistics company needed to optimize supply chain operations, reduce delivery times, and improve inventory management across multiple warehouses.",
      solution: "Advanced logistics platform with route optimization, real-time tracking, predictive analytics, and automated inventory management systems.",
      results: [
        "25% reduction in delivery times",
        "30% improvement in inventory accuracy",
        "40% reduction in fuel costs",
        "50% faster order processing"
      ],
      technologies: ["React", "Node.js", "Machine Learning", "PostgreSQL", "Redis", "Docker"],
      testimonial: {
        quote: "The logistics platform has transformed our operations. We're delivering faster, more efficiently, and our customers are extremely satisfied.",
        author: "Maria Rodriguez",
        role: "Chief Operations Officer",
        company: "Global Logistics Corp"
      },
      featured: true,
      views: 1897,
      likes: 134,
      shares: 38,
      comments: 21,
      publishedDate: "2025-01-18",
      lastUpdated: "2025-01-25",
      status: "completed",
      projectPhase: "Live & Maintained"
    },
    {
      id: 10,
      title: "Retail Analytics & Customer Insights",
      client: "Fashion Forward Retail",
      industry: "Retail",
      duration: "6 months",
      teamSize: "10 developers",
      budget: "$180,000",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&auto=format",
      challenge: "Fashion retail chain needed advanced analytics to understand customer behavior, optimize inventory, and improve sales performance across all stores.",
      solution: "Comprehensive retail analytics platform with customer journey tracking, inventory optimization, sales forecasting, and personalized marketing automation.",
      results: [
        "45% increase in customer engagement",
        "30% improvement in inventory turnover",
        "25% increase in average order value",
        "60% reduction in stockouts"
      ],
      technologies: ["React", "Python", "Machine Learning", "PostgreSQL", "Redis", "Tableau"],
      testimonial: {
        quote: "The analytics platform has given us unprecedented insights into our customers. Our sales have increased significantly, and we're making smarter inventory decisions.",
        author: "Sarah Chen",
        role: "VP of Marketing",
        company: "Fashion Forward Retail"
      },
      featured: false,
      views: 1654,
      likes: 112,
      shares: 29,
      comments: 17,
      publishedDate: "2025-01-15",
      lastUpdated: "2025-01-22",
      status: "completed",
      projectPhase: "Live & Maintained"
    }
  ];

export const getCaseStudyById = (id) => {
  return caseStudiesData.find(study => study.id === parseInt(id));
};

export const getFeaturedCaseStudies = () => {
  return caseStudiesData.filter(study => study.featured);
};

export const getCaseStudiesByIndustry = (industry) => {
  if (industry === 'All') return caseStudiesData;
  return caseStudiesData.filter(study => study.industry === industry);
};
