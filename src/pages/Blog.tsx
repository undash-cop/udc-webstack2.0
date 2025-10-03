import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { blogData, getBlogPostsByCategory, getFeaturedBlogPosts } from '../data/blogData';
import { 
  ArrowRightIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  HeartIcon,
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

  // Use centralized data
  const blogPosts = blogData;

  const categories = [
    { name: 'All', count: blogPosts.length },
    { name: 'Technology', count: blogPosts.filter((post: any) => post.category === 'Technology').length },
    { name: 'Architecture', count: blogPosts.filter((post: any) => post.category === 'Architecture').length },
    { name: 'Automation', count: blogPosts.filter((post: any) => post.category === 'Automation').length },
    { name: 'Security', count: blogPosts.filter((post: any) => post.category === 'Security').length }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = getBlogPostsByCategory(selectedCategory).filter((post: any) => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag: any) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  }).sort((a: any, b: any) => {
    switch (sortBy) {
      case 'popular':
        return (b.views || 0) - (a.views || 0);
      case 'trending':
        return (b.likes || 0) - (a.likes || 0);
      case 'latest':
      default:
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
  });

  const featuredPosts = getFeaturedBlogPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SparklesIcon className="h-4 w-4" />
            Latest Insights & Trends
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Technology & Automation Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay ahead with the latest insights on technology, automation, and digital transformation. 
            Discover practical tips, industry trends, and expert advice to accelerate your business growth.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Sort and View Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <ChartBarIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <BookOpenIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post: any) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <EyeIcon className="h-4 w-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartIcon className="h-4 w-4" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <ChatBubbleLeftIcon className="h-4 w-4" />
                          {post.comments}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                    >
                      Read Article
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: any) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="block">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      {post.featured && (
                        <div className="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <EyeIcon className="h-4 w-4" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4" />
                            {post.likes}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{formatDate(post.publishedDate)}</span>
                      </div>
                      <div className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                        Read More
                        <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post: any) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="block">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">{post.readTime}</span>
                          {post.featured && (
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <EyeIcon className="h-4 w-4" />
                              {post.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <HeartIcon className="h-4 w-4" />
                              {post.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <ChatBubbleLeftIcon className="h-4 w-4" />
                              {post.comments}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{formatDate(post.publishedDate)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
