const jobOpeningsData = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "5+ years",
    salary: "₹15,00,000 - ₹20,00,000",
    posted: "2 days ago",
    featured: true,
    urgent: false,
    description: "We're looking for a Senior Full Stack Developer to join our engineering team. You'll work on building scalable web applications using modern technologies and contribute to our product roadmap.",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "Docker",
      "GraphQL",
      "Jest"
    ],
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Design and implement RESTful APIs and GraphQL endpoints",
      "Collaborate with product managers and designers to define requirements",
      "Write clean, maintainable, and well-tested code",
      "Mentor junior developers and conduct code reviews",
      "Optimize application performance and scalability",
      "Participate in agile development processes"
    ]
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "4+ years",
    salary: "₹14,00,000 - ₹18,00,000",
    posted: "1 week ago",
    featured: true,
    urgent: true,
    description: "Join our product team as a Product Manager to drive the vision and strategy for our core products. You'll work closely with engineering, design, and business teams to deliver exceptional user experiences.",
    skills: [
      "Product Strategy",
      "User Research",
      "Agile/Scrum",
      "Data Analysis",
      "Figma",
      "Jira",
      "SQL",
      "A/B Testing"
    ],
    responsibilities: [
      "Define product roadmap and strategy based on user needs and business goals",
      "Conduct user research and analyze product metrics to inform decisions",
      "Collaborate with engineering and design teams to deliver features",
      "Create detailed product requirements and user stories",
      "Manage product backlog and prioritize features",
      "Work with stakeholders to align on product vision and goals",
      "Monitor product performance and iterate based on feedback"
    ]
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "₹10,00,000 - ₹13,00,000",
    posted: "3 days ago",
    featured: false,
    urgent: false,
    description: "We're seeking a talented UX/UI Designer to create intuitive and beautiful user experiences. You'll work on both web and mobile applications, collaborating closely with product and engineering teams.",
    skills: [
      "Figma",
      "Sketch",
      "Adobe Creative Suite",
      "User Research",
      "Prototyping",
      "Design Systems",
      "HTML/CSS",
      "Framer"
    ],
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with product managers and developers",
      "Maintain and evolve our design system",
      "Present design concepts to stakeholders",
      "Iterate on designs based on user feedback and data"
    ]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "4+ years",
    salary: "₹12,00,000 - ₹16,00,000",
    posted: "5 days ago",
    featured: false,
    urgent: false,
    description: "Join our DevOps team to help scale our infrastructure and improve our deployment processes. You'll work with cutting-edge cloud technologies and automation tools.",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
      "Python",
      "Bash",
      "Monitoring"
    ],
    responsibilities: [
      "Manage and scale cloud infrastructure on AWS",
      "Implement CI/CD pipelines and automation",
      "Monitor system performance and troubleshoot issues",
      "Ensure security and compliance of infrastructure",
      "Collaborate with development teams on deployment processes",
      "Document infrastructure and operational procedures",
      "Implement monitoring and alerting systems"
    ]
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Delhi, India",
    type: "Full-time",
    experience: "3+ years",
    salary: "₹9,00,000 - ₹12,00,000",
    posted: "1 week ago",
    featured: false,
    urgent: false,
    description: "We're looking for a Marketing Manager to lead our digital marketing efforts and drive growth. You'll develop and execute marketing campaigns across multiple channels.",
    skills: [
      "Digital Marketing",
      "Google Analytics",
      "Social Media",
      "Content Marketing",
      "Email Marketing",
      "SEO/SEM",
      "HubSpot",
      "Adobe Creative Suite"
    ],
    responsibilities: [
      "Develop and execute digital marketing campaigns",
      "Manage social media presence and content strategy",
      "Analyze marketing metrics and optimize campaigns",
      "Collaborate with design team on marketing materials",
      "Manage email marketing and lead nurturing programs",
      "Conduct market research and competitive analysis",
      "Work with sales team to align marketing and sales efforts"
    ]
  },
  {
    id: 6,
    title: "Data Scientist",
    department: "Data",
    location: "Pune, India",
    type: "Full-time",
    experience: "3+ years",
    salary: "₹13,00,000 - ₹17,00,000",
    posted: "4 days ago",
    featured: false,
    urgent: false,
    description: "Join our data team to extract insights from our data and build machine learning models. You'll work with large datasets and help drive data-driven decision making across the company.",
    skills: [
      "Python",
      "R",
      "SQL",
      "Machine Learning",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "Jupyter"
    ],
    responsibilities: [
      "Analyze large datasets to extract actionable insights",
      "Build and deploy machine learning models",
      "Create data visualizations and reports",
      "Collaborate with product and engineering teams",
      "Design and implement A/B tests",
      "Maintain data pipelines and ETL processes",
      "Present findings to stakeholders and executives"
    ]
  },
  {
    id: 7,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Chennai, India",
    type: "Full-time",
    experience: "2+ years",
    salary: "₹8,00,000 - ₹10,00,000",
    posted: "6 days ago",
    featured: false,
    urgent: false,
    description: "Help our customers succeed with our products and drive customer satisfaction. You'll work directly with clients to ensure they get maximum value from our solutions.",
    skills: [
      "Customer Relationship Management",
      "Salesforce",
      "Communication",
      "Problem Solving",
      "Data Analysis",
      "Project Management",
      "Technical Support",
      "Account Management"
    ],
    responsibilities: [
      "Manage relationships with key customer accounts",
      "Onboard new customers and ensure successful adoption",
      "Identify opportunities for upselling and expansion",
      "Resolve customer issues and escalations",
      "Collect and analyze customer feedback",
      "Collaborate with sales and product teams",
      "Develop customer success strategies and best practices"
    ]
  },
  {
    id: 8,
    title: "Frontend Developer Intern",
    department: "Engineering",
    location: "Remote",
    type: "Internship",
    experience: "0-1 years",
    salary: "₹300 - ₹450/hour",
    posted: "1 day ago",
    featured: false,
    urgent: false,
    description: "Great opportunity for a Frontend Developer Intern to gain hands-on experience with modern web technologies. You'll work on real projects and learn from experienced developers.",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Git",
      "Responsive Design",
      "Webpack",
      "Bootstrap",
      "API Integration"
    ],
    responsibilities: [
      "Develop responsive web interfaces using React",
      "Implement UI components and user interactions",
      "Write clean, maintainable code following best practices",
      "Participate in code reviews and team meetings",
      "Learn and apply modern frontend development tools",
      "Collaborate with designers and backend developers",
      "Contribute to project documentation and testing"
    ]
  }
];

export default jobOpeningsData;
