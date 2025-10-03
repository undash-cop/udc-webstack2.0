export const blogData = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore the latest trends shaping web development in 2025, from AI integration to performance optimization techniques.",
    content: `
      <p>Web development continues to evolve at a rapid pace, with 2025 bringing exciting new trends and technologies that are reshaping how we build and interact with web applications.</p>
      
      <h2>Artificial Intelligence Integration</h2>
      <p>AI is becoming increasingly integrated into web development workflows. From automated code generation to intelligent testing, AI tools are helping developers work more efficiently and create better user experiences.</p>
      
      <h2>Performance-First Development</h2>
      <p>With Core Web Vitals becoming more important for SEO, developers are focusing on performance from the ground up. Techniques like code splitting, lazy loading, and edge computing are becoming standard practices.</p>
      
      <h2>Progressive Web Apps (PWAs)</h2>
      <p>PWAs continue to gain traction as they bridge the gap between web and native applications, offering offline functionality, push notifications, and app-like experiences.</p>
      
      <h2>WebAssembly (WASM)</h2>
      <p>WebAssembly is enabling high-performance applications to run in browsers, opening up new possibilities for complex applications that previously required native development.</p>
      
      <h2>Conclusion</h2>
      <p>Staying ahead of these trends is crucial for developers who want to build modern, efficient, and user-friendly web applications. The future of web development is bright and full of opportunities.</p>
    `,
    author: "Sarah Johnson",
    authorRole: "Senior Developer",
    authorImage: "https://i.pravatar.cc/100?img=1",
    publishedDate: "2025-01-20",
    readTime: "8 min read",
    views: 1247,
    likes: 89,
    comments: 12,
    tags: ["Web Development", "Technology", "Trends"],
    category: "Technology",
    featured: true,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "Web Development Trends 2025", url: "https://example.com/web-trends-2025" },
      { name: "AI in Web Development", url: "https://example.com/ai-web-dev" }
    ]
  },
  {
    id: 2,
    title: "Building Scalable Microservices Architecture",
    excerpt: "Learn how to design and implement microservices that can scale with your business needs and handle millions of requests.",
    content: `
      <p>Microservices architecture has become the go-to solution for building scalable, maintainable applications. In this comprehensive guide, we'll explore how to design and implement microservices that can grow with your business.</p>
      
      <h2>What are Microservices?</h2>
      <p>Microservices are a software development approach where applications are built as a collection of loosely coupled, independently deployable services. Each service is responsible for a specific business function.</p>
      
      <h2>Benefits of Microservices</h2>
      <ul>
        <li>Scalability: Scale individual services based on demand</li>
        <li>Technology Diversity: Use different technologies for different services</li>
        <li>Fault Isolation: Failure in one service doesn't bring down the entire system</li>
        <li>Team Autonomy: Different teams can work on different services independently</li>
      </ul>
      
      <h2>Design Principles</h2>
      <p>When designing microservices, consider these key principles:</p>
      <ul>
        <li>Single Responsibility: Each service should have one clear purpose</li>
        <li>Loose Coupling: Services should be independent and communicate through APIs</li>
        <li>High Cohesion: Related functionality should be grouped together</li>
        <li>Data Independence: Each service should own its data</li>
      </ul>
      
      <h2>Implementation Best Practices</h2>
      <p>Successfully implementing microservices requires careful planning and adherence to best practices. Focus on service discovery, API gateway implementation, and monitoring.</p>
    `,
    author: "Michael Chen",
    authorRole: "Lead Architect",
    authorImage: "https://i.pravatar.cc/100?img=2",
    publishedDate: "2025-01-18",
    readTime: "12 min read",
    views: 892,
    likes: 67,
    comments: 8,
    tags: ["Microservices", "Architecture", "Scalability"],
    category: "Architecture",
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "Microservices Patterns", url: "https://example.com/microservices-patterns" },
      { name: "Building Scalable Systems", url: "https://example.com/scalable-systems" }
    ]
  },
  {
    id: 3,
    title: "Automating Daily Tasks with AI: A Complete Guide",
    excerpt: "Discover how artificial intelligence can streamline your daily workflow and boost productivity across various industries.",
    content: `
      <p>Artificial Intelligence is revolutionizing how we approach daily tasks, from simple automation to complex decision-making processes. This guide explores practical AI applications for everyday productivity.</p>
      
      <h2>Email Automation</h2>
      <p>AI-powered email tools can categorize, prioritize, and even draft responses to emails, saving hours of manual work each week.</p>
      
      <h2>Data Entry and Processing</h2>
      <p>Machine learning algorithms can extract information from documents, forms, and databases with high accuracy, eliminating repetitive data entry tasks.</p>
      
      <h2>Customer Service Automation</h2>
      <p>Chatbots and virtual assistants powered by AI can handle common customer inquiries, providing 24/7 support while freeing up human agents for complex issues.</p>
      
      <h2>Financial Automation</h2>
      <p>AI systems can analyze spending patterns, categorize expenses, and even suggest budget optimizations automatically.</p>
      
      <h2>Getting Started</h2>
      <p>Begin with simple automation tools and gradually integrate more complex AI solutions as your comfort level increases.</p>
    `,
    author: "Emily Rodriguez",
    authorRole: "AI Specialist",
    authorImage: "https://i.pravatar.cc/100?img=3",
    publishedDate: "2025-01-15",
    readTime: "10 min read",
    views: 1156,
    likes: 94,
    comments: 15,
    tags: ["Automation", "AI", "Productivity"],
    category: "Automation",
    featured: true,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "AI Automation Tools", url: "https://example.com/ai-automation" },
      { name: "Productivity with AI", url: "https://example.com/ai-productivity" }
    ]
  },
  {
    id: 4,
    title: "The Complete Guide to React Performance Optimization",
    excerpt: "Master React performance optimization techniques to build lightning-fast applications that provide exceptional user experiences.",
    content: `
      <p>React performance optimization is crucial for building applications that provide smooth user experiences. This comprehensive guide covers the most effective techniques for optimizing React applications.</p>
      
      <h2>Code Splitting</h2>
      <p>Implement code splitting to load only the necessary code for each route or component, reducing initial bundle size and improving load times.</p>
      
      <h2>Memoization</h2>
      <p>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders and expensive calculations.</p>
      
      <h2>Virtual Scrolling</h2>
      <p>For large lists, implement virtual scrolling to render only visible items, dramatically improving performance.</p>
      
      <h2>Bundle Analysis</h2>
      <p>Regularly analyze your bundle to identify and eliminate unnecessary dependencies and optimize imports.</p>
      
      <h2>Lazy Loading</h2>
      <p>Implement lazy loading for components, images, and other resources to improve initial page load performance.</p>
    `,
    author: "David Kim",
    authorRole: "Frontend Engineer",
    authorImage: "https://i.pravatar.cc/100?img=4",
    publishedDate: "2025-01-12",
    readTime: "15 min read",
    views: 987,
    likes: 76,
    comments: 11,
    tags: ["React", "Performance", "Frontend"],
    category: "Technology",
    featured: false,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "React Performance Guide", url: "https://example.com/react-performance" },
      { name: "Frontend Optimization", url: "https://example.com/frontend-optimization" }
    ]
  },
  {
    id: 5,
    title: "Cloud Security Best Practices for Modern Applications",
    excerpt: "Essential security practices for protecting your cloud-based applications and data from evolving cyber threats.",
    content: `
      <p>As more applications move to the cloud, security becomes increasingly important. This guide covers essential security practices for protecting cloud-based applications.</p>
      
      <h2>Identity and Access Management</h2>
      <p>Implement robust IAM policies to control who can access what resources in your cloud environment.</p>
      
      <h2>Data Encryption</h2>
      <p>Encrypt data both in transit and at rest to protect sensitive information from unauthorized access.</p>
      
      <h2>Network Security</h2>
      <p>Use virtual private clouds, security groups, and network ACLs to control traffic flow and protect your applications.</p>
      
      <h2>Monitoring and Logging</h2>
      <p>Implement comprehensive monitoring and logging to detect and respond to security incidents quickly.</p>
      
      <h2>Regular Security Audits</h2>
      <p>Conduct regular security audits and penetration testing to identify and address vulnerabilities.</p>
    `,
    author: "Alex Thompson",
    authorRole: "Security Engineer",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    publishedDate: "2025-01-10",
    readTime: "11 min read",
    views: 743,
    likes: 58,
    comments: 6,
    tags: ["Security", "Cloud", "Best Practices"],
    category: "Security",
    featured: false,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "Cloud Security Framework", url: "https://example.com/cloud-security" },
      { name: "Cybersecurity Best Practices", url: "https://example.com/cybersecurity-practices" }
    ]
  },
  {
    id: 6,
    title: "Machine Learning in Production: Best Practices for 2025",
    excerpt: "Learn how to successfully deploy and maintain machine learning models in production environments with these proven strategies and tools.",
    content: `
      <p>Deploying machine learning models to production is one of the biggest challenges facing data science teams today. This comprehensive guide covers everything you need to know about ML in production.</p>
      
      <h2>Model Deployment Strategies</h2>
      <p>Choosing the right deployment strategy is crucial for ML model success. Consider factors like latency requirements, scalability needs, and update frequency.</p>
      
      <h2>Monitoring and Observability</h2>
      <p>Continuous monitoring of model performance, data drift, and system health is essential for maintaining production ML systems.</p>
      
      <h2>Model Versioning and A/B Testing</h2>
      <p>Implement robust versioning strategies and A/B testing frameworks to safely deploy and evaluate new model versions.</p>
      
      <h2>Infrastructure Considerations</h2>
      <p>Design scalable, reliable infrastructure that can handle the unique requirements of ML workloads in production.</p>
    `,
    author: "Dr. Alex Kumar",
    authorRole: "ML Engineer",
    authorImage: "https://i.pravatar.cc/100?img=5",
    publishedDate: "2025-01-28",
    readTime: "14 min read",
    views: 1876,
    likes: 142,
    comments: 28,
    tags: ["Machine Learning", "Production", "DevOps", "AI"],
    category: "Technology",
    featured: true,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "MLOps Best Practices", url: "https://example.com/mlops-practices" },
      { name: "Production ML Guide", url: "https://example.com/production-ml" }
    ]
  },
  {
    id: 7,
    title: "The Future of Remote Work Technology",
    excerpt: "Explore the latest technologies and tools that are shaping the future of remote work and distributed teams.",
    content: `
      <p>Remote work has become the new normal, and technology continues to evolve to support distributed teams. Here's what the future holds for remote work technology.</p>
      
      <h2>Virtual Reality Workspaces</h2>
      <p>VR technology is creating immersive virtual offices where remote workers can collaborate as if they're in the same physical space.</p>
      
      <h2>AI-Powered Collaboration Tools</h2>
      <p>Artificial intelligence is enhancing collaboration tools with smart scheduling, automated meeting summaries, and intelligent task management.</p>
      
      <h2>Advanced Communication Platforms</h2>
      <p>Next-generation communication tools are breaking down barriers with real-time translation, emotion recognition, and spatial audio.</p>
      
      <h2>Digital Wellness and Work-Life Balance</h2>
      <p>Technology is also helping remote workers maintain better work-life balance through smart scheduling and wellness monitoring.</p>
    `,
    author: "Lisa Wang",
    authorRole: "Remote Work Specialist",
    authorImage: "https://i.pravatar.cc/100?img=6",
    publishedDate: "2025-01-25",
    readTime: "9 min read",
    views: 2234,
    likes: 167,
    comments: 34,
    tags: ["Remote Work", "Technology", "Future", "Collaboration"],
    category: "Technology",
    featured: false,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "Remote Work Trends 2025", url: "https://example.com/remote-work-trends" },
      { name: "Future of Work Technology", url: "https://example.com/future-work-tech" }
    ]
  },
  {
    id: 8,
    title: "Blockchain Applications Beyond Cryptocurrency",
    excerpt: "Discover how blockchain technology is being used across various industries to solve real-world problems beyond digital currencies.",
    content: `
      <p>While cryptocurrency brought blockchain to mainstream attention, the technology has far-reaching applications across multiple industries.</p>
      
      <h2>Supply Chain Transparency</h2>
      <p>Blockchain is revolutionizing supply chain management by providing immutable records of product journeys from source to consumer.</p>
      
      <h2>Digital Identity and Authentication</h2>
      <p>Self-sovereign identity solutions are giving users control over their personal data while improving security and privacy.</p>
      
      <h2>Smart Contracts in Real Estate</h2>
      <p>Automated contract execution is streamlining real estate transactions and reducing the need for intermediaries.</p>
      
      <h2>Healthcare Data Management</h2>
      <p>Blockchain is enabling secure, interoperable health records while maintaining patient privacy and data integrity.</p>
    `,
    author: "James Park",
    authorRole: "Blockchain Developer",
    authorImage: "https://i.pravatar.cc/100?img=7",
    publishedDate: "2025-01-22",
    readTime: "11 min read",
    views: 1456,
    likes: 98,
    comments: 19,
    tags: ["Blockchain", "Technology", "Innovation", "Decentralization"],
    category: "Technology",
    featured: false,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "Blockchain Use Cases", url: "https://example.com/blockchain-use-cases" },
      { name: "Enterprise Blockchain", url: "https://example.com/enterprise-blockchain" }
    ]
  },
  {
    id: 9,
    title: "The Rise of Edge Computing: Bringing Processing Closer to Data",
    excerpt: "Learn how edge computing is transforming data processing by moving computation closer to where data is generated.",
    content: `
      <p>Edge computing is revolutionizing how we process data by bringing computation closer to the source, reducing latency and improving performance.</p>
      
      <h2>What is Edge Computing?</h2>
      <p>Edge computing involves processing data near its source rather than sending it to centralized cloud servers, enabling real-time decision making.</p>
      
      <h2>Benefits of Edge Computing</h2>
      <p>Reduced latency, improved security, better bandwidth utilization, and enhanced reliability are key advantages of edge computing architectures.</p>
      
      <h2>Use Cases and Applications</h2>
      <p>From autonomous vehicles to smart cities, edge computing is enabling new applications that require real-time processing and low latency.</p>
      
      <h2>Implementation Challenges</h2>
      <p>While powerful, edge computing presents unique challenges in terms of management, security, and distributed system complexity.</p>
    `,
    author: "Dr. Maria Santos",
    authorRole: "Edge Computing Expert",
    authorImage: "https://i.pravatar.cc/100?img=8",
    publishedDate: "2025-01-19",
    readTime: "12 min read",
    views: 1789,
    likes: 125,
    comments: 23,
    tags: ["Edge Computing", "Cloud", "IoT", "Performance"],
    category: "Technology",
    featured: true,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "Edge Computing Guide", url: "https://example.com/edge-computing-guide" },
      { name: "Edge vs Cloud Computing", url: "https://example.com/edge-vs-cloud" }
    ]
  },
  {
    id: 10,
    title: "Sustainable Technology: Building Green Software Solutions",
    excerpt: "Discover how to build environmentally conscious software solutions that minimize energy consumption and carbon footprint.",
    content: `
      <p>As climate change becomes a pressing concern, the tech industry is focusing on building sustainable software solutions that minimize environmental impact.</p>
      
      <h2>Green Software Principles</h2>
      <p>Learn the fundamental principles of green software development, including energy efficiency, carbon awareness, and resource optimization.</p>
      
      <h2>Optimizing for Energy Efficiency</h2>
      <p>Techniques for writing code that consumes less energy, from algorithm optimization to efficient data structures and caching strategies.</p>
      
      <h2>Carbon-Aware Applications</h2>
      <p>Build applications that adapt their behavior based on the carbon intensity of the electricity grid, reducing environmental impact.</p>
      
      <h2>Measuring and Monitoring Impact</h2>
      <p>Tools and methodologies for measuring the environmental impact of software applications and tracking improvements over time.</p>
    `,
    author: "Elena Green",
    authorRole: "Sustainability Engineer",
    authorImage: "https://i.pravatar.cc/100?img=9",
    publishedDate: "2025-01-16",
    readTime: "10 min read",
    views: 1345,
    likes: 89,
    comments: 16,
    tags: ["Sustainability", "Green Tech", "Environment", "Efficiency"],
    category: "Technology",
    featured: false,
    image: "https://images.unsplash.com/photo-1569163139394-de6e4c3b9a4e?w=800&h=400&fit=crop&auto=format",
    sources: [
      { name: "Green Software Foundation", url: "https://example.com/green-software" },
      { name: "Sustainable Development Goals", url: "https://example.com/sdg-tech" }
    ]
  }
];

export const getBlogPostById = (id) => {
  return blogData.find(post => post.id === parseInt(id));
};

export const getFeaturedBlogPosts = () => {
  return blogData.filter(post => post.featured);
};

export const getBlogPostsByCategory = (category) => {
  if (category === 'All') return blogData;
  return blogData.filter(post => post.category === category);
};

export const getBlogPostsByTag = (tag) => {
  return blogData.filter(post => post.tags.includes(tag));
};

export const getRelatedPosts = (currentPostId, limit = 3) => {
  const currentPost = getBlogPostById(currentPostId);
  if (!currentPost) return [];
  
  return blogData
    .filter(post => post.id !== currentPostId && post.category === currentPost.category)
    .slice(0, limit);
};
