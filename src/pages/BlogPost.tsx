import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  ClockIcon, 
  EyeIcon, 
  HeartIcon, 
  ShareIcon, 
  BookOpenIcon,
  TagIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<{
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole: string;
    authorImage: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    views: number;
    likes: number;
    comments: number;
    tags: string[];
    sources: { name: string; url: string; }[];
  } | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<NonNullable<typeof post>[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // Mock blog posts data (same as in Blog.tsx) - moved outside useEffect
  const blogPosts = useMemo(() => [
      {
        id: 1,
        title: "The Future of AI in Business: Transforming Operations in 2025",
        excerpt: "Discover how artificial intelligence is revolutionizing business operations, from automation to predictive analytics, and learn how to implement AI solutions in your organization.",
        content: `
          <h2>Introduction to AI in Business</h2>
          <p>Artificial Intelligence (AI) is no longer a futuristic concept but a present reality that's transforming how businesses operate. In 2025, we're seeing unprecedented adoption of AI technologies across industries, from small startups to Fortune 500 companies.</p>
          
          <h3>Key Areas of AI Implementation</h3>
          <p>Businesses are leveraging AI in several critical areas:</p>
          <ul>
            <li><strong>Process Automation:</strong> Automating repetitive tasks and workflows to increase efficiency</li>
            <li><strong>Predictive Analytics:</strong> Using machine learning to forecast trends and make data-driven decisions</li>
            <li><strong>Customer Service:</strong> Implementing chatbots and virtual assistants for 24/7 support</li>
            <li><strong>Supply Chain Optimization:</strong> Using AI to optimize inventory, logistics, and demand forecasting</li>
          </ul>

          <h3>Real-World Success Stories</h3>
          <p>Companies like Amazon, Google, and Microsoft have demonstrated the power of AI in business transformation. Amazon's recommendation engine increases sales by 35%, while Google's AI-powered search algorithms process billions of queries daily.</p>

          <h3>Getting Started with AI Implementation</h3>
          <p>For businesses looking to implement AI solutions:</p>
          <ol>
            <li>Identify specific use cases where AI can add value</li>
            <li>Start with pilot projects to test feasibility</li>
            <li>Invest in data quality and infrastructure</li>
            <li>Train your team on AI tools and concepts</li>
            <li>Scale successful implementations across the organization</li>
          </ol>

          <h3>Future Outlook</h3>
          <p>As we move forward, AI will become even more integrated into business operations. The key to success lies in understanding that AI is a tool to augment human capabilities, not replace them entirely.</p>
        `,
        author: "Dr. Sarah Chen",
        authorRole: "AI Research Director",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        date: "2025-10-01",
        readTime: "8 min read",
        category: "AI & Technology",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
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
        content: `
          <h2>Why Daily Automation Matters</h2>
          <p>In today's fast-paced business environment, time is your most valuable resource. By automating routine tasks, you can focus on high-value activities that drive growth and innovation.</p>
          
          <h3>10 Tasks You Can Automate Today</h3>
          
          <h4>1. Email Management</h4>
          <p>Set up email filters and rules to automatically sort incoming messages. Use tools like Gmail's smart labels or Outlook's rules to categorize emails by sender, subject, or keywords.</p>
          
          <h4>2. Social Media Posting</h4>
          <p>Schedule your social media content in advance using tools like Buffer, Hootsuite, or Later. This ensures consistent posting without daily manual effort.</p>
          
          <h4>3. Data Entry</h4>
          <p>Use form automation tools like Zapier or Microsoft Power Automate to automatically transfer data between applications, eliminating manual data entry errors.</p>
          
          <h4>4. Invoice Processing</h4>
          <p>Implement automated invoice processing systems that can extract data, validate information, and route invoices for approval without human intervention.</p>
          
          <h4>5. Report Generation</h4>
          <p>Create automated reports that pull data from various sources and generate insights on a scheduled basis, saving hours of manual analysis.</p>
          
          <h4>6. Customer Support</h4>
          <p>Deploy chatbots to handle common customer inquiries, providing instant responses and freeing up your support team for complex issues.</p>
          
          <h4>7. File Organization</h4>
          <p>Use automated file naming and organization systems to keep your digital workspace clean and organized without manual effort.</p>
          
          <h4>8. Backup and Sync</h4>
          <p>Set up automated backup systems that regularly save your important files to cloud storage, ensuring data security without manual intervention.</p>
          
          <h4>9. Meeting Scheduling</h4>
          <p>Use calendar automation tools to handle meeting scheduling, send reminders, and manage availability without back-and-forth emails.</p>
          
          <h4>10. Expense Tracking</h4>
          <p>Implement automated expense tracking that captures receipts, categorizes expenses, and generates reports for accounting purposes.</p>
          
          <h3>Getting Started with Automation</h3>
          <p>Start small with one or two tasks and gradually expand your automation efforts. The key is to identify repetitive, time-consuming tasks that can be easily automated.</p>
        `,
        author: "Alex Thompson",
        authorRole: "Automation Specialist",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        date: "2025-09-28",
        readTime: "6 min read",
        category: "AI & Technology",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
        views: 1923,
        likes: 89,
        comments: 15,
        tags: ["Automation", "Productivity", "Workflow", "Tools", "Efficiency"],
        sources: [
          { name: "Zapier - Automation Best Practices", url: "https://zapier.com/blog/automation-best-practices" },
          { name: "Microsoft Power Automate Documentation", url: "https://docs.microsoft.com/en-us/power-automate" },
          { name: "Forbes - Business Process Automation", url: "https://www.forbes.com/sites/forbestechcouncil/2024/automation-trends" }
        ]
      }
      // Add more posts as needed
    ], []);

  useEffect(() => {
    // Find the blog post by ID
    const foundPost = blogPosts.find(p => p.id === parseInt(id || '0'));
    if (foundPost) {
      setPost(foundPost);
      setLikes(foundPost.likes);
      // Find related posts (same category, different ID)
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    } else {
      navigate('/blog');
    }
  }, [id, navigate, blogPosts]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load the article.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">{post.authorRole}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <EyeIcon className="w-4 h-4 mr-1" />
                  {post.views} views
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <HeartIcon className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {likes} {likes === 1 ? 'Like' : 'Likes'}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TagIcon className="w-5 h-5 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sources */}
      {post.sources && (
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources & References</h3>
              <div className="space-y-3">
                {post.sources.map((source: { name: string; url: string; }, index: number) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700 underline"
                  >
                    {source.name}
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <span className="inline-block bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs font-medium mb-3">
                      {relatedPost.category}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {relatedPost.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to Blog CTA */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
            <p className="text-primary-100 mb-6">
              Discover more insights and automation tips in our blog.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Explore More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
