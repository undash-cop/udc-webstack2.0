import Card from '../components/Card';
import companyData from '../data/companyData';
import { 
  CalendarIcon, 
  UserIcon, 
  ArrowRightIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const blogPosts = companyData.blogs.map((blog, index) => ({
    id: index + 1,
    title: blog.title,
    excerpt: blog.description || 'Read more about this topic in our latest blog post.',
    author: blog.author,
    date: blog.date,
    readTime: '5 min read',
    category: 'Business Management',
    image: blog.photo || '/api/placeholder/400/250',
    featured: index === 0
  }));

  const categories = ['All', 'AI & Technology', 'Cloud Computing', 'Security', 'Development', 'Analytics', 'Workplace'];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in technology 
            and business transformation.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full border border-primary-200 text-primary-700 hover:bg-primary-600 hover:text-white transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Article</h2>
              <p className="text-gray-600">Our most popular and insightful content</p>
            </div>
            
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
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
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">{featuredPost.date}</p>
                      </div>
                    </div>
                    
                    <button className="btn-primary flex items-center">
                      Read More
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Articles</h2>
            <p className="text-gray-600">Fresh insights and updates from our team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden">
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
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                      Read More
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest insights, 
            trends, and updates from the world of technology.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
          
          <p className="text-primary-200 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
